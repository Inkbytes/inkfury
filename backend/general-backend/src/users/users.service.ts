import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../src/entities/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import {User} from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>) {
    }

    public async getAll() {
        return await this.repo.find();
    }

    public async create(user : AddUserDto) {
        return await this.repo.save(user);
    }

    public async remove(username : string) {
        return await this.repo.delete({username: username});
    }
}
