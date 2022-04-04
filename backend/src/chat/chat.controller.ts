import { Body, Controller, Get, Post, Delete, Req, Param, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../users/decorator/user.decorator';
import { User } from '../users/interfaces/user.interface';
import { RoomDto, UpdateRoomDto } from './dto/chat.dto';
import { ChatService } from './chat.service';
import { AuthGuard } from '../oauth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

    /* -- PROBLEM WOULD BE ROUTES -- */

    /* @Get(':id')
    async getRoom(@Param('id') id: number) {
        return this.chatService.getRoom(id);
    } */

    @Get()
    async getRooms() {
        return this.chatService.getRooms();
    }

    @Get(':id/members')
    async getRoomMembers(@Param('id') id: number) {
        return this.chatService.getRoomMembers(id);
    }

    @Get(':id/blocked_members')
    async getRoomBlockedMembers(@Param('id') id: number) {
        return this.chatService.getRoomBlockedMembers(id);
    }

    @Get(':id/muted_members')
    async getRoomMutedMembers(@Param('id') id: number) {
        return this.chatService.getRoomMutedMembers(id);
    }

    @Post()
    async createRoom(@Body() room : RoomDto) {
        return this.chatService.createRoom(room);
    }

    /* @Post(':id')
    async updateRoom(@Param('id') id: number, @Body() roomData: UpdateRoomDto, @CurrentUser() currentUser: User) {
        console.log(currentUser);
        return this.chatService.updateRoom(id, roomData, currentUser);
    } */

    @Delete(':id')
    async deleteRoom(@Param('id') id: number) {
        return this.chatService.deleteRoom(id);
    }
}
