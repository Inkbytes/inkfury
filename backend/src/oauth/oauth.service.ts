import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { UserEntity } from '../entities/user.entity';

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
          '998ac50996d9cd0c4d5eafad44e20b762d94718513d1566c8aa71e02a778e7a2',
        client_secret:
          'd006fae911b7002803f7355030f2f486f1e400e6c9cad5ca6e967c0ad6bd3779',
        code: `${code}`,
        redirect_uri: 'http://10.12.2.2:9000/api/login/intra/redirect',
      },
    })
      .then((resp) => {
        return resp.data['access_token'];
      })
      .catch((err) => {
		  console.error(err)
        throw new UnauthorizedException();
      });
  }

  async GetUserData(data, access_token) {
    const user = await this.repo
      .findOne({ id: Number.parseInt(data.id) })
      .then((res) => {
        return res;
      });
    if (!user) return this.CreateUser(data, access_token);
    return this.repo.findOne({ id: Number.parseInt(data.id) });
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
	  statsId: 0
    };
    return this.repo.save(user);
  }
}
