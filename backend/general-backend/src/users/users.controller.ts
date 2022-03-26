import {Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { AddUserDto } from "./dto/add-user.dto";
import {User} from "./interfaces/user.interface";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService) {}

    @Get()
    getUsers() {
        return this.userService.getAll();
    }

    @Post('')
    add(@Body() adduser : AddUserDto) {
        return this.userService.create(adduser);
    }

    @Delete(':username')
    getUser(@Param('username') id : string) {
        return this.userService.remove(id);
    }


    // @Put()
    // updateUser(@Body() addUserDto: AddUserDto) : string {
    //     return 'User updated.';
    // }
    // @Put()
    // UpdateUser(@)
}

