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
          '02464eaa4c826d485b1f3efa0658c8f710a1ef48bd8908bad4988e823a84a7a3',
        client_secret:
          '13bbaf9585449f74595c67ffc34529439b5b3fd8e15f90964e0658d503aed5ca',
        code: `${code}`,
        redirect_uri: 'http://localhost:9000/api/login/intra/redirect',
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
