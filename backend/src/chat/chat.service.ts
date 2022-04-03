import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/chat.entity';
import { RoomDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(RoomEntity) private readonly roomRepo : Repository<RoomEntity>) {}

    // Get a room in DB
    public async getRoom(id: number) : Promise<RoomDto> {
        return await this.roomRepo.findOne(id);
    }

    // Get rooms in DB
    /* -- THIS WILL TAKE AS PARAMETER A USER ID -- */
    public async getRooms() : Promise<RoomDto[]> {
        return await this.roomRepo.find();
    }

    // Create method for creating a room in DB
    public async createRoom(room: RoomDto) : Promise<RoomDto> {
        return await this.roomRepo.save(room);
    }

    // Delete method for deleting a room in DB
    public async deleteRoom(id: number) {
        return await this.roomRepo.delete({id: id});
    }

}
