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
        "client_id": "1d12e68ec30c1d6b0225e6ce42dff29942c5bff4c48a271bcc9760576c17a54f",
        "client_secret": "c8eb088e3c0785483323731dcf6d0b880a8a3da75ec4b7c12dd94c79f57a03cd",
        "code": `${code}`,
        "redirect_uri": "http://10.12.1.6:3000/google/redirect",
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
