import { ConsoleLogger, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../users/dto/add-user.dto';

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
        "client_id": "8b93710cfef0ce75e1cc33753a7d6568d2bbd8080cb4bb49ea0a4f013f42334c",
        "client_secret": "7a784ccab19f967f874605d7a235f7f067fd9d2b4a82d38a15e06a7e07d47716",
        "code": `${code}`,
        "redirect_uri": "http://10.12.1.6:9000/api/login/intra/redirect",
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
    const user = await this.repo.findOne({'token': access_token}).then((res) => {return res});
    if (user === undefined)
      return this.CreateUser(data, access_token);
    return this.repo.findOne({'token': access_token})
  }

  // Create user and save it to database
  public async CreateUser(data, token : string) {
    const user = {
        'id': Number.parseInt(data.id),
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
    }
    console.log(user);
    return this.repo.save(user);
  }
}