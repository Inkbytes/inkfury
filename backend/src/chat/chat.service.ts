import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Req,
  NotFoundException,
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

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
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
  public async checkPasswordValidation(id: number, pwToCheck: PasswordDto ) {
    const roomPw = await this.roomRepo
    .findOne({ id: id }, { select: ['password'] })
    .then(({ password }) => password);
    const isMatch = await bcrypt.compare(pwToCheck.password, roomPw);
    return (isMatch);
  }


  public async updateRoom(id: number, roomData: RoomDto, currentUser : UserEntity) {
    const room = await this.roomRepo.findOne(id);
    if (!room) throw new NotFoundException();
    if ((currentUser.id !== room.owner_id && !room.admins?.includes(currentUser.id)) ||
    (roomData.owner_id !== room.owner_id))
        throw new UnauthorizedException();
    if (roomData.password && currentUser.id !== room.owner_id)
        throw new UnauthorizedException("Only the owner can change the password!");
    if (roomData.password) {
      const salt = await bcrypt.genSalt();
      roomData.password = await bcrypt.hash(roomData.password, salt);
      roomData.pw_protected = true;
    }
    return await this.roomRepo.update(id, roomData);
  }

  /*-------------------|
  |------ READ --------|
  |-------------------*/
  public async getRoom(id: number): Promise<RoomDto> {
    return await this.roomRepo.findOne(id);
  }

  public async getRooms(): Promise<RoomDto[]> {
    return await this.roomRepo.find();
  }

  /*------------------|
    |------ DELETE -----|
    |-------------------*/
  public async deleteRoom(id: number) {
    return await this.roomRepo.delete({ id: id });
  }
}
