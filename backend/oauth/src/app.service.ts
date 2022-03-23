import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req) {
    return {
      message: 'User information from google',
      user: req.url,
    }
  }
}
