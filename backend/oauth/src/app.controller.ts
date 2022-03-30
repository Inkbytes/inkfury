import { Controller, Get , Req, Res, Post, UseGuards, Headers, UnauthorizedException, ConsoleLogger} from '@nestjs/common';
import { AppService } from './app.service';
import axios from "axios";
import { Request, response, Response } from 'express';
import { Console } from 'console';


@Controller('login')
export class AppController {
  constructor(private readonly appService: AppService) {
  }


  @Get()
  async (@Res() res) {
    return res.redirect("https://api.intra.42.fr/oauth/authorize?client_id=77eb42bfeb6cc2d7cce083bf2aed00a32fff7fdfe0926c5a28856a86e14f9539&redirect_uri=http%3A%2F%2F10.12.2.4%3A3000%2Fapi%2Flogin%2Fintra%2Fredirect&response_type=code");
  }
  @Get('/intra/redirect')
  async googleAuthRedirect(@Req() req, @Res() res) : Promise<any> {
    if (req.query.code === undefined) {
      return res.status(401).redirect('http://10.12.2.4:8081/');
    }
    res.cookie('oauth2_grant_code', req.query.code);
    return res.redirect(`http://10.12.2.4:8081/?auth=true`);
  }

  @Post('/login_verification')
  async loginVerification(@Req() req : Request, @Res() res : Response, @Headers() headers) : Promise<any> {
    if (!req.cookies['oauth2_grant_code'] && !req.cookies['access_token'])
      throw new UnauthorizedException();
    else if (req.cookies['access_token']) {
      const result = await axios({
        url: "https://api.intra.42.fr/v2/me",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + req.cookies['access_token']
        }
      }).then(resp => {
        return this.appService.GetUserData(resp.data);
      }).catch(err => {
        console.log(err.message);
        throw new UnauthorizedException();
      })
  
      return res.json(result);
    }

    const code = req.cookies['oauth2_grant_code'];
    const access_token = await this.appService.GetAccessToken(code).then((access) => {
      return access;
    });
    // Set cookies
    res.cookie('access_token', access_token);
    res.clearCookie('oauth2_grant_code');

    const result = await axios({
      url: "https://api.intra.42.fr/v2/me",
      method: "GET",
      headers: {
        "Authorization": "Bearer " + access_token
      }
    }).then(resp => {
      return this.appService.GetUserData(resp.data);
    }).catch(err => {
      console.log(err.message);
      throw new UnauthorizedException();
    })

    return res.json(result);
  }
}
