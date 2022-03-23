import {Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import { AddUserDto } from "./dto/add-user.dto";
import {User} from "./interfaces/user.interface";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService) {}

    @Get()
    getUsers() : User[] {
        return this.userService.findAll();
    }

    @Get(':id')
    getUser(@Param('id') id : string) : User {
        return this.userService.findOne(id);
    }

    @Post()
    addUser(@Body()  addUserDto : AddUserDto): string {
        if (addUserDto != undefined && this.userService.addUser(addUserDto) === true)
            return `User ${addUserDto.id} added.`;
        return `Can't add User ${addUserDto.id}.`;

    }

    @Delete(":id")
    rmUser(@Param('id') id : string) : string {
        if (this.userService.rmUser(id) === true)
            return `User ${id} removed.`
        return `Can't remove User ${id}.`
    }

    // @Put()
    // updateUser(@Body() addUserDto: AddUserDto) : string {
    //     return 'User updated.';
    // }

}
