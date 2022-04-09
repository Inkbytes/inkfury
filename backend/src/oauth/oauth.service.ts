import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class OauthService {
    constructor(@InjectRepository(UserEntity) private readonly repo : Repository<UserEntity>){}
  googleLogin(req) {
  }

  async GetAccessToken(code : string) : Promise<string> {
    return await axios({
      url: "https://api.intra.42.fr/oauth/token",
      method: "POST",
      data: {
        "grant_type": "authorization_code",
        "client_id": "1d7e497d8b0a14becedd483d22da705fcc45f4f654abe411fde8e63bf3d38cc7",
        "client_secret": "f6f01052d3bc27f01d83b0f2edbe99d2196ddac6f9b1714760cb9de889403f27",
        "code": `${code}`,
        "redirect_uri": "http://10.12.1.4:9000/api/login/intra/redirect",
      }
    }).then((resp) => {
      return resp.data["access_token"];
    }).catch((err) => {
      throw new UnauthorizedException();
    })
  }

  async findOne(condition : any): Promise<UserEntity> {
    return this.repo.findOne(condition);
  }

  async GetUserData(data, access_token) {
    const user = await this.repo.findOne({'token': access_token});
    if (user === undefined)
      return this.CreateUser(data, access_token);
    return {'user': user, 'signin': true};
  }

  // Create user and save it to database
  public async CreateUser(data, token : string) {
    const user = {
        'id': Number.parseInt(data.id),
        'email': data.email,
        'fullname': data.displayname,
        'login': data.login,
        'avatar': data.image_url,
        'friendList': [],
        'roomList': [],
        'statsId': 0,
        'status': true,
        'is2fa': false,
        'token': token,
        'blockedUsers': [],
        'inGame': false,
        'logged': true,
    }
    const userd = await this.repo.save(user).then((sg) => {
      return sg;
    });
    return {'user': userd, "signin": false};
  }
}
