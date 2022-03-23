import { Controller, Get , Req, Res, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }


  @Get()
  async (@Res() res) {
    return res.redirect("https://api.intra.42.fr/oauth/authorize?client_id=1d12e68ec30c1d6b0225e6ce42dff29942c5bff4c48a271bcc9760576c17a54f&redirect_uri=http%3A%2F%2F10.12.3.2%3A3000%2Fgoogle%2Fredirect&response_type=code");
  }

  @Get('/google/redirect')
  googleAuthRedirect(@Req() req, @Res() res) : any {
    return res.redirect("http://localhost:8080/login_succ");
  }
}
