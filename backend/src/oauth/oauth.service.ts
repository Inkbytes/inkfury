import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
  googleLogin(req) {
    return {
      message: 'User information from google',
      user: req.url,
    };
  }

  async GetAccessToken(code: string): Promise<string> {
    return await axios({
      url: 'https://api.intra.42.fr/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id:
          '3f629c13c719f75d1671989b3a96bb75d7796453b81b6ca8096945afbb88ab9c',
        client_secret:
          '7a4bc77dc2a441a48b34815ccbff76e2247c5b5e37e37da22429c1a8ab397769',
        code: `${code}`,
        redirect_uri: 'http://localhost:9000/api/login/intra/redirect',
      },
    })
      .then((resp) => {
        return resp.data['access_token'];
      })
      .catch((err) => {
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
