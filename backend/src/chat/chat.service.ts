import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/chat.entity';
import { RoomDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(RoomEntity) private readonly roomRepo : Repository<RoomEntity>) {}

    /*-------------------|
    |--- CREATE ---------|
    |------------------ */
    public async createRoom(room: RoomDto) : Promise<RoomDto> {
        return await this.roomRepo.save(room);
    }

    
    /*-----------------|
    |--- UPDATE -------|
    |---------------- */
    public async updateRoomName(id: number, newRoomName: string) {
        const roomd = await this.roomRepo.findOne({ id: id }).then((room) => {
            return room;
        });
        if (roomd !== undefined) {
            return await this.roomRepo.update(roomd, { name: newRoomName });
        }
    }

    public async updatePassword(id: number, newPassword: string) {
        const roomd = await this.roomRepo.findOne({ id: id }).then((room) => {
            return room;
        });
        if (roomd !== undefined) {
            await this.roomRepo.update(roomd, { pw_protected: true });
            return await this.roomRepo.update(roomd, { password: newPassword });
        }
    }

    /*-------------------|
    |------ READ --------|
    |-------------------*/
    public async getRoom(id: number) : Promise<RoomDto> {
        return await this.roomRepo.findOne(id);
    }

    /* -- THIS WILL TAKE AS PARAMETER A USER ID -- */
    public async getRooms() : Promise<RoomDto[]> {
        return await this.roomRepo.find();
    }

    public async getRoomMembers(id: number) : Promise<number[]> {
        const roomd = await this.roomRepo.findOne({ id: id }).then((room) => {
            return room.members;
        });
        return roomd;
    }

    public async getRoomBlockedMembers(id: number) : Promise<number[]> {
        const roomd = await this.roomRepo.findOne({ id: id }).then((room) => {
            return room.blocked_members;
        });
        return roomd;
    }

    public async getRoomMutedMembers(id: number) : Promise<number[]> {
        const roomd = await this.roomRepo.findOne({ id: id }).then((room) => {
            return room.muted_members;
        });
        return roomd;
    }
    
    /*------------------|
    |------ DELETE -----|
    |-------------------*/
    public async deleteRoom(id: number) {
        return await this.roomRepo.delete({ id: id });
    }

}
