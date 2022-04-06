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
import { RoomDto } from './dto/chat.dto';
import { Request } from "express";
import { UserEntity } from '../entities/user.entity';

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
        throw new UnauthorizedException();
    if (roomData.password && currentUser.id !== room.owner_id)
        throw new UnauthorizedException("Only the owner can change the password!");
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

  public async getRoomMembers(id: number): Promise<number[]> {
    return await this.roomRepo
      .findOne({ id: id }, { select: ['members'] })
      .then(({ members }) => members);
  }

  public async getRoomBlockedMembers(id: number): Promise<number[]> {
    return await this.roomRepo
      .findOne({ id: id }, { select: ['blocked_members'] })
      .then(({ blocked_members }) => blocked_members);
  }

  public async getRoomMutedMembers(id: number): Promise<number[]> {
    return await this.roomRepo
      .findOne({ id: id }, { select: ['muted_members'] })
      .then(({ muted_members }) => muted_members);
  }

  /*------------------|
    |------ DELETE -----|
    |-------------------*/
  public async deleteRoom(id: number) {
    return await this.roomRepo.delete({ id: id });
  }
}
