import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/interfaces/user.interface';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/chat.entity';
import { RoomDto, UpdateRoomDto } from './dto/chat.dto';

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
    /* public async updateRoom(id: number, roomData: UpdateRoomDto, currentUser: User) {
        const room = await this.roomRepo.findOne(id);
        if (!room) throw new ForbiddenException();
        if (currentUser.id !== room.owner_id && !room.admins?.includes(currentUser.id))
            throw new UnauthorizedException();
        if (roomData.password && currentUser.id !== room.owner_id)
            throw new UnauthorizedException("Only owners can change the password");
        return await this.roomRepo.update(id, roomData);
    } */

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
        return await this.roomRepo.findOne({ id: id }, { select: ['members'] })
            .then(({ members }) => (members));
    }

    public async getRoomBlockedMembers(id: number) : Promise<number[]> {
        return await this.roomRepo.findOne({ id: id }, { select: ['blocked_members'] })
            .then(({ blocked_members }) => (blocked_members));
    }

    public async getRoomMutedMembers(id: number) : Promise<number[]> {
        return await this.roomRepo.findOne({ id: id }, { select: ['muted_members'] })
            .then(({ muted_members }) => (muted_members));
    }
    
    /*------------------|
    |------ DELETE -----|
    |-------------------*/
    public async deleteRoom(id: number) {
        return await this.roomRepo.delete({ id: id });
    }

}
