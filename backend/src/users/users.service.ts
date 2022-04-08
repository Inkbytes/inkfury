import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/add-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private jwtService : JwtService
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async getUser(login : string) {
    return await this.repo.findOne({'login' : login});
  }
  public async getUserById(id : number) {
    return await this.repo.findOne({'id' : id});
  }
  public async create(user: UserDto) {
    return await this.repo.save(user);
  }

  public async remove(username: string) {
    return await this.repo.delete({ login: username });
  }

  public async update(user: UserDto) {
    const userd = await this.repo.findOne({id : user.id}).then((user) => {
      return user;
    });
    if ((userd !== undefined && userd.id === user.id) || userd === undefined)
    return await this.repo.update({ id: user.id }, user);
    return {"Error": "Login already exist."};
  }

  public async verify(cookie: string) {
    const data = await this.jwtService.verifyAsync(cookie).then((data) => {
        return data;
    })

    if (!data) 
        return false;
    
    const user = await this.repo.findOne({id: data['id']}).then((user) => {
        return user;
    });

    if (!user)
        return false;
    return true;
}
}