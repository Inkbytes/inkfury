import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from './dto/add-user.dto';
import { User } from './interfaces/user.interface';
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

  @Post('')
  add(@Body() adduser: UserDto) {
    return this.userService.create(adduser);
  }

  @Put()
  updateUser(@Body() user: UserDto) {
    console.log(user);
    return this.userService.update(user);
  }
}
