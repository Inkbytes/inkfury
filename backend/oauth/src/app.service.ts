import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  googleLogin(req) {
    return {
      message: 'User information from google',
      user: req.url,
    }
  }

  async GetAccessToken(code : string) : Promise<string> {
    return await axios({
      url: "https://api.intra.42.fr/oauth/token",
      method: "POST",
      data: {
        "grant_type": "authorization_code",
        "client_id": "77eb42bfeb6cc2d7cce083bf2aed00a32fff7fdfe0926c5a28856a86e14f9539",
        "client_secret": "fa5bfca536bf16a9e068b1907b3e0f3c8b2784d6c3a62a875024e08626dc8bdb",
        "code": `${code}`,
        "redirect_uri": "http://10.12.2.4:3000/api/login/intra/redirect",
      }
    }).then((resp) => {
      return resp.data["access_token"];
    }).catch((err) => {
      throw new UnauthorizedException();
    })
  }

  async GetUserData(data) {
    return  {
      'id': data.id,
      'email': data.email,
      'login': data.login,
      'fullName': data.displayname,
      'avatar': data.image_url,
    }
  }
}
