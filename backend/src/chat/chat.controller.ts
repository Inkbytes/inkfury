import { Body, Controller, Get, Post, Delete, Req, Param, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RoomDto } from './dto/chat.dto';

@Controller('chat')
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

    /* @Get(':id')
    async getRoomMembers(@Param('id') id: number) {
        return this.chatService.getRoomMembers(id);
    } */

    /* @Get(':id')
    async getRoomBlockedMembers(@Param('id') id: number) {
        return this.chatService.getRoomBlockedMembers(id);
    } */

   /*  @Get(':id')
    async getRoomMutedMembers(@Param('id') id: number) {
        return this.chatService.getRoomMutedMembers(id);
    } */

    @Post()
    async createRoom(@Body() room : RoomDto) {
        return this.chatService.createRoom(room);
    }

    /* @Put(':id/:name')
    async updateRoomName(@Param('id') id: number, @Param('name') newRoomName: string) {
        return this.chatService.updateRoomName(id, newRoomName);
    } */

    /* @Put(':id/:password')
    async updatePassword(@Param('id') id: number, @Param('password') newPassword: string) {
        return this.chatService.updatePassword(id, newPassword);
    } */

    @Delete(':id')
    async deleteRoom(@Param('id') id: number) {
        return this.chatService.deleteRoom(id);
    }
}
