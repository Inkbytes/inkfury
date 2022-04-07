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
    const currentUser = await this.checkToken(req);
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.getRooms();
  }
  
  @Get(':id')
  async getRoom(@Req() req : Request, @Param('id') id: number) {
    const currentUser = await this.checkToken(req);
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.getRoom(id);
  }

  @Post()
  async createRoom(@Req() req : Request, @Body() room: RoomDto) {
    const currentUser = await this.checkToken(req);
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.createRoom(room);
  }

  @Post(':id/join')
  async checkPassword(@Req() req : Request, @Param('id') id: number, @Body() pwToCheck: PasswordDto) : Promise<boolean> {
    const currentUser = await this.checkToken(req);
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.checkPasswordValidation(id, pwToCheck);
  }

  @Post(':id')
  async updateRoom(@Req() req : Request, @Param('id') id: number, @Body() roomData: RoomDto) {
    const currentUser = await this.checkToken(req);
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.updateRoom(id, roomData, currentUser);
  }

  @Delete(':id')
  async deleteRoom(@Req() req : Request, @Param('id') id: number) {
    const currentUser = await this.checkToken(req);
    if (!currentUser) throw new ForbiddenException();
    return this.chatService.deleteRoom(id);
  }
}