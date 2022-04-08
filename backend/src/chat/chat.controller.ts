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
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { RoomDto, PasswordDto } from './dto/chat.dto';
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
  ) {}

  private async checkToken(req : Request) {
    const cookie = req.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!cookie || !data) { throw new UnauthorizedException(); }
    return (await this.userService.getUserById(data['id']));
  }

  @Get()
  async getRooms(@Req() req : Request) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.getRooms();
  }
  
  @Get(':id')
  async getRoom(@Req() req : Request, @Param('id') id: number) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.getRoom(id);
  }
  
  @Post()
  async createRoom(@Req() req : Request, @Body() room: RoomDto) : Promise<RoomDto> {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.createRoom(room);
  }

  @Post(':id')
  async updateRoom(@Req() req : Request, @Param('id') id: number, @Body() roomData: RoomDto) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.updateRoom(id, roomData, currentUser);
  }

  @Post(':room_id/join/:user_id')
  async joinRoomMembers(@Req() req: Request, @Param('room_id') roomId: number, @Param('user_id') userToAdd: number, @Body() pwToCheck: PasswordDto) : Promise<boolean> {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.joinRoomMembers(roomId, userToAdd, pwToCheck, currentUser);
  }

  @Post(':id/leave') //Check if user is last member, if yes delete room from db
  async leaveRoom(@Req() req : Request, @Param('id') id: number) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.leaveRoom(id, currentUser);
  }

  @Post(':room_id/mute/:user_id')
  async muteUser(@Req() req : Request, @Param('room_id') roomId: number, @Param('user_id') userToMute: number) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.muteUser(roomId, userToMute, currentUser);
  }

  @Post(':room_id/block/:user_id')
  async blockUser(@Req() req : Request, @Param('room_id') roomId: number, @Param('user_id') userToBlock: number) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.blockUser(roomId, userToBlock, currentUser);
  }



  @Delete(':id')
  async deleteRoom(@Req() req : Request, @Param('id') id: number) {
    let currentUser;
    try {
      currentUser = await this.checkToken(req);
    } catch (e) {
        console.error(e);
    }
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.deleteRoom(id, currentUser);
  }
}
