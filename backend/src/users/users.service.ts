import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/add-user.dto';
import { User } from './interfaces/user.interface';
import multiparty from 'multiparty';
import { IncomingMessage } from 'http';
import fs from 'fs';
import { findSourceMap } from 'module';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async getUser(login) {
    return await this.repo.findOne({'login' : login});
  }
  public async create(user: UserDto) {
    return await this.repo.save(user);
  }

  public async remove(username: string) {
    return await this.repo.delete({ login: username });
  }

  public async update(user: UserDto) {
    console.log(user);
    const userd = await this.repo.findOne({login : user.login}).then((user) => {
      return user;
    });
    if ((userd !== undefined && userd.id === user.id) || userd === undefined)
      return await this.repo.update({ id: user.id }, user);
    return {"Error": "Login already exist."};
  }
}
