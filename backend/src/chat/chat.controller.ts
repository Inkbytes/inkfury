import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Param,
  Put,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { RoomDto } from './dto/chat.dto';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('chat')
// @UseGuards(AuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService : UsersService,
    private jwtService : JwtService
  ){}

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
  async createRoom(@Body() room: RoomDto) {
    console.log(room);
    return this.chatService.createRoom(room);
  }

  @Post(':id')
    async updateRoom(@Req() req : Request, @Param('id') id: number, @Body() roomData: RoomDto) {
      const cookie = req.cookies['jwt'];
      if (!cookie) {
        throw new UnauthorizedException();
      }

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {throw new UnauthorizedException();}

      const currentUser = await this.userService.getUserById(data['id']);
      return this.chatService.updateRoom(id, roomData, currentUser);
    }

  @Delete(':id')
  async deleteRoom(@Param('id') id: number) {
    return this.chatService.deleteRoom(id);
  }
}
