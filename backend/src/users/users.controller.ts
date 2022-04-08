import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import * as fs from 'fs';
import {FileInterceptor} from '@nestjs/platform-express';
import { UserDto } from './dto/add-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Get(':login')
  getUser(@Param('login') login : string) {
      return this.userService.getUser(login);
  }
  @Get(':id')
  getUserById(@Param('id') id : number) {
      return this.userService.getUserById(id);
  }

  @Post('')
  add(@Body() adduser: UserDto) {
    return this.userService.create(adduser);
  }

  @Put()
  updateUser(@Body() user: UserDto) {
    return this.userService.update(user);
  }
  
  @Post('/image/:imageName')
  @UseInterceptors(FileInterceptor('file'))
  getImage(@Param('imageName') imageName : string, @UploadedFile() file: Express.Multer.File) {
    fs.writeFileSync("/Users/oel-ouar/Desktop/hamid/frontend/public/assets/"+imageName, file.buffer);
    return "OK";
  }
}