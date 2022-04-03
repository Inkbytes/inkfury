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
          '692c512c7ac5c517fff90c0360ad71d0ebb322b9c5b2bd373cf01102e2836fe5',
        client_secret:
          'b1ad468b9f56cd25c66c355d60530d5b5694f468c37354dec598724058fc7ebb',
        code: `${code}`,
        redirect_uri: 'http://10.12.1.6:9000/api/login/intra/redirect',
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
