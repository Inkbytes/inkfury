import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/interfaces/user.interface';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/chat.entity';
import { PasswordDto, RoomDto } from './dto/chat.dto';
import { Request } from "express";
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { emit } from 'process';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo : Repository<UserEntity>,
    private jwtService : JwtService,
  ) {}

  /*-------------------|
  |--- CREATE ---------|
  |------------------ */
  public async createRoom(room: RoomDto): Promise<RoomDto> {
    const roomd = await this.roomRepo.findOne({ name: room.name });
    if (roomd !== undefined && roomd.name === room.name) throw new ForbiddenException("Room name taken!");
    if (room.password) {
      const salt = await bcrypt.genSalt();
      room.password = await bcrypt.hash(room.password, salt);
      room.pw_protected = true;
    }
    return await this.roomRepo.save(room);
  }

  /*-----------------|
  |--- UPDATE -------|
  |---------------- */
  public async updateRoom(id: number, roomData: RoomDto, currentUser : UserEntity) {
    const room = await this.roomRepo.findOne(id);
    if (!room) throw new NotFoundException();
    if ((currentUser.id !== room.owner_id && !room.admins?.includes(currentUser.id)) ||
    (roomData.owner_id !== room.owner_id))
        throw new UnauthorizedException("User is neither an owner nor an administrator");
    if (roomData.password && currentUser.id !== room.owner_id)
        throw new UnauthorizedException("Only the owner can change the password!");
    if (roomData.password) {
      const salt = await bcrypt.genSalt();
      roomData.password = await bcrypt.hash(roomData.password, salt);
      roomData.pw_protected = true;
    }
    return await this.roomRepo.update(id, roomData);
  }

  private async addUser(roomd: RoomDto, roomId: number, userToAdd: number, userd: UserEntity) {
    roomd.members.push(userToAdd);
    userd.roomList.push(roomId);
    await this.roomRepo.update(roomId, roomd);
    await this.userRepo.update(userd.id, userd);
    return true;
  }

  public async joinRoomMembers(roomId: number, userToAdd: number, pwToCheck: PasswordDto, currentUser: UserEntity) : Promise<boolean> {
    const roomd = await this.roomRepo.findOne(roomId);
    const userd = await this.userRepo.findOne(currentUser.id);
    if (!roomd || !userd) throw new NotFoundException();
    if (roomd.blocked_members?.includes(parseInt(userToAdd.toString()))) {
      throw new UnauthorizedException("User blocked from room!");
    }
    if (roomd.members?.includes(parseInt(userToAdd.toString())))
      return true;
    if (!roomd.pw_protected) {
      return this.addUser(roomd, roomId, userToAdd, userd);
    }
    if (roomd.pw_protected && pwToCheck.password) {
      if (!await bcrypt.compare(pwToCheck.password, roomd.password))
        throw new UnauthorizedException("Wrong password");
      return this.addUser(roomd, roomId, userToAdd, userd);
    }
    else {
      throw new BadRequestException("Body required");
    }
  }

  public async leaveRoom(id: number, currentUser : UserEntity) : Promise<boolean> {
    const roomd = await this.roomRepo.findOne(id);
    if (!roomd) throw new NotFoundException();
    for (let i = 0; i < roomd.members.length; i++){ 
      if (roomd.members[i] === currentUser.id) { 
          roomd.members.splice(i, 1);
          await this.roomRepo.update(id, roomd);
          if (roomd.members.length == 0) {
            await this.roomRepo.delete({ id: id });
          }
          return true;
      }
    }
    return false;
  }

  public async muteUser(roomId: number, userToMute: number, currentUser: UserEntity) {
    const roomd = await this.roomRepo.findOne(roomId);
    if (!roomd) throw new NotFoundException("Room was not found");
    if (currentUser.id !== roomd.owner_id && !roomd.admins?.includes(currentUser.id))
      throw new UnauthorizedException("User not owner nor administrator");
    if (roomd.muted_members?.includes(parseInt(userToMute.toString())))
      return true;
    if (roomd.members?.includes(parseInt(userToMute.toString()))) {
        roomd.muted_members.push(userToMute);
        await this.roomRepo.update(roomId, roomd);
        return true;
    }
    throw new NotFoundException("User was not found");
  }

  public async unmuteUser(roomId: number, userToUnmute: number, currentUser: UserEntity) {
    const roomd = await this.roomRepo.findOne(roomId);
    if (!roomd) throw new NotFoundException("Room was not found");
    if (currentUser.id !== roomd.owner_id && !roomd.admins?.includes(currentUser.id))
      throw new UnauthorizedException("User not owner nor administrator");
    if (roomd.muted_members?.includes(parseInt(userToUnmute.toString()))) {
      for (let i = 0; i < roomd.muted_members.length; i++) {
        if (roomd.muted_members[i] === parseInt(userToUnmute.toString())) {
          roomd.muted_members.splice(i, 1);
          await this.roomRepo.update(roomId, roomd);
          return true;
        }
      }
    }
    throw new NotFoundException("User was not found");
  }

  public async makeAdmin(roomId: number, user: number, currentUser: UserEntity) {
    const roomd = await this.roomRepo.findOne(roomId);
    if (!roomd) throw new NotFoundException("Room was not found");
    if (currentUser.id !== roomd.owner_id)
      throw new UnauthorizedException("User not owner");
    if (roomd.admins.find(e => e === user) === undefined) {
      roomd.admins.push(user);
      await this.roomRepo.update(roomId, roomd);
      return true;
    }
      
    throw new NotFoundException("User already an admin");
  }

  public async blockUser(roomId: number, userToBlock: number, currentUser: UserEntity) {
    const roomd = await this.roomRepo.findOne(roomId);
    if (!roomd) throw new NotFoundException("Room was not found");
    if (currentUser.id !== roomd.owner_id && !roomd.admins?.includes(currentUser.id))
      throw new UnauthorizedException("User not owner nor administrator");
    if (roomd.blocked_members?.includes(parseInt(userToBlock.toString())))
      return true;
    if (roomd.members?.includes(parseInt(userToBlock.toString()))) {
        roomd.blocked_members.push(userToBlock);
        for (let i = 0; i < roomd.members.length; i++) {
          if (roomd.members[i] === parseInt(userToBlock.toString())) {
            roomd.members.splice(i, 1);
            await this.roomRepo.update(roomId, roomd);
            break ;
          }
        }
        return true;
    }
    throw new NotFoundException("User was not found");
  }

  /*-------------------|
  |------ READ --------|
  |-------------------*/
  public async getRoom(id: number): Promise<RoomDto> {
    const roomd = await this.roomRepo.findOne(id);
    delete roomd.password;
    return roomd;
  }

  public async getRooms(): Promise<RoomDto[]> {
    const roomd = await this.roomRepo.find();
    for (let key of Object.keys(roomd)) {
      delete roomd[key].password;
    }
    return roomd;
  }

  /*------------------|
  |------ DELETE -----|
  |-------------------*/
  public async deleteRoom(id: number, currentUser : UserEntity) {
    const roomd = await this.roomRepo.findOne(id);
    if (!roomd) throw new NotFoundException("Room was not found");
    if (roomd !== undefined && currentUser.id !== roomd.owner_id) { throw new UnauthorizedException("User's not the owner of the room"); }
    return await this.roomRepo.delete({ id: id });
  }
}
