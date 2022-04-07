import { Controller, Get , Req, Res, Post, UseGuards, Headers, UnauthorizedException, ConsoleLogger} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from "axios";
import { Request, response, Response } from 'express';
import { userInfo } from 'os';
import { OauthService } from './oauth.service';


@Controller('login')
export class OauthController {
  private sign;

  constructor(
    private readonly authService: OauthService,
    private jwtService : JwtService
    ) {
      this.sign = false;
  }


  @Get()
  async (@Res() res) {
    return res.redirect("https://api.intra.42.fr/oauth/authorize?client_id=8b93710cfef0ce75e1cc33753a7d6568d2bbd8080cb4bb49ea0a4f013f42334c&redirect_uri=http%3A%2F%2F10.12.1.6%3A9000%2Fapi%2Flogin%2Fintra%2Fredirect&response_type=code");
  }
  

  @Get('/intra/redirect')
  async IntraAuthRedirect(@Req() req, @Res() res) : Promise<any> {
    
    if (req.query.code === undefined) {
      return res.status(401).redirect('http://10.12.1.6:8081/');
    }

    const access_token = await this.authService.GetAccessToken(req.query.code).then((res) => {
      return res;
    })
    const result = await axios({
      url: "https://api.intra.42.fr/v2/me",
      method: "GET",
      headers: {
        "Authorization": "Bearer " + access_token
      }
    }).then(resp => {
      return this.authService.GetUserData(resp.data, access_token);
    }).catch(err => {
      console.log(err.message);
      throw new UnauthorizedException();
    })

    if (!result) {
      throw new UnauthorizedException();
    }
    // console.log(result);
    const jwt = await this.jwtService.signAsync({id : result.user.id});

    res.cookie('jwt', jwt , {httpOnly: true});
    //
    //
    return res.redirect(`http://10.12.1.6:8081/?auth=true`);
  }

  @Get('logout')
  async Logout(@Req() req: Request, @Res() res: Response,) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {throw new UnauthorizedException();}

      res.clearCookie('jwt');
      res.redirect('http://10.12.1.6:8081/');
    } catch (e) {
      throw new UnauthorizedException();
    }
  
  }
  @Post('/login_verification')
  async loginVerification(@Req() req : Request, @Res() res : Response, @Headers() headers) : Promise<any> {
    const cookie = req.cookies['jwt'];

    if (!cookie)
      throw new UnauthorizedException();

    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {throw new UnauthorizedException();}

    const user = await this.authService.findOne({id: data['id']});
    let sign;
    if (user !== undefined){
      sign = user.isFirst;
    }
    return res.json({user, sign});
  }
}



