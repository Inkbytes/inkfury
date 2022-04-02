import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../users/dto/add-user.dto';

@Injectable()
export class OauthService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async GetAccessToken(code: string): Promise<string> {
    return await axios({
      url: 'https://api.intra.42.fr/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id:
          'bcf55a604c8a500225dcade725cb60dd33b9487917ee2688696f8ca6dbb6d600',
        client_secret:
          'cc95c0ab85b2f2e47fd977db9f90f589531857dd7d938e5c84f589feca729da8',
        code: `${code}`,
        redirect_uri: 'http://10.12.2.4:9000/api/login/intra/redirect',
      },
    })
      .then((resp) => {
        return resp.data['access_token'];
      })
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  async GetUserData(data, access_token) {
    const user = await this.repo
      .findOne({ token: access_token })
      .then((res) => {
        return res;
      });
    if (user === undefined) return this.CreateUser(data, access_token);
    return this.repo.findOne({ token: access_token });
  }

  // Create user and save it to database
  public async CreateUser(data, token: string) {
    console.log(data.id);
    const user = {
      id: Number.parseInt(data.id),
      fullname: data.displayname,
      login: data.login,
      avatar: data.image_url,
      friendList: [],
      roomList: [],
      status: true,
      is2fa: false,
      token: token,
      blockedUsers: [],
    };
    return this.repo.save(user);
  }
}
