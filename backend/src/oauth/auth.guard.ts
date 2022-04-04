import { Inject, Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.cookies['access_token'])
      throw new UnauthorizedException();

    request.user = await axios({
      url: 'https://api.intra.42.fr/v2/me',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + request.cookies['access_token'],
      },
    })
      .then(async (resp) => {
        const user = await this.repo.findOne({ id: Number.parseInt(resp.data.id) });
        if (!user) throw new UnauthorizedException();
        return this.repo.findOne(Number.parseInt(resp.data.id));
      })
      .catch((err) => {
        console.log(err.message);
        throw new UnauthorizedException();
      });

    return true;
  }
}