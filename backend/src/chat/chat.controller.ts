import { Body, Controller, Get, Post, Delete, Req, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RoomDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

    @Get(':id')
    async getRoom(@Param('id') id: number) {
        return this.chatService.getRoom(id);
    }

    @Get()
    async getRooms() {
        return this.chatService.getRooms();
    }

    @Post()
    async createRoom(@Body() room : RoomDto) {
        return this.chatService.createRoom(room);
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: number) {
        return this.chatService.deleteRoom(id);
    }
}
