import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';
import { OauthService } from './oauth.service';

@Controller('login')
export class OauthController {
  constructor(private readonly authService: OauthService) {}

  @Get()
  async(@Res() res) {
    return res.redirect(
      'https://api.intra.42.fr/oauth/authorize?client_id=692c512c7ac5c517fff90c0360ad71d0ebb322b9c5b2bd373cf01102e2836fe5&redirect_uri=http%3A%2F%2F10.12.1.6%3A9000%2Fapi%2Flogin%2Fintra%2Fredirect&response_type=code',
    );
  }

  @Get('/intra/redirect')
  async IntraAuthRedirect(@Req() req, @Res() res): Promise<any> {
    console.log(req.query.code);
    if (req.query.code === undefined) {
      return res.status(401).redirect('http://10.12.1.6:8081/');
    }
    res.cookie('oauth2_grant_code', req.query.code);
    return res.redirect(`http://10.12.1.6:8081/auth=true`);
  }

  @Post('/login_verification')
  async loginVerification(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    if (!req.cookies['oauth2_grant_code'] && !req.cookies['access_token'])
      throw new UnauthorizedException();
    else if (req.cookies['access_token']) {
      const result = await axios({
        url: 'https://api.intra.42.fr/v2/me',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + req.cookies['access_token'],
        },
      })
        .then((resp) => {
          return this.authService.GetUserData(
            resp.data,
            req.cookies['access_token'],
          );
        })
        .catch((err) => {
          console.log(err.message);
          throw new UnauthorizedException();
        });

      return res.json(result);
    }

    const code = req.cookies['oauth2_grant_code'];
    const access_token = await this.authService
      .GetAccessToken(code)
      .then((res) => {
        return res;
      });

    console.log(access_token);
    // Set cookies
    res.cookie('access_token', access_token);
    res.clearCookie('oauth2_grant_code');

    const result = await axios({
      url: 'https://api.intra.42.fr/v2/me',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
      .then((resp) => {
        // Create new user
        return this.authService.GetUserData(resp.data, access_token);
      })
      .catch((err) => {
        console.log(err.message);
        throw new UnauthorizedException();
      });

    return res.json(result);
  }
}
