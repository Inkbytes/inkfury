import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('user/:id')
  getIndex(@Param('id')  id): JSON {
    const options = {
      "Hello" : id
    }
    return JSON.parse(JSON.stringify(options));
  }
  @Post('/register')
  setUser(@Body() body): JSON {
    const options = {
      "Status" : "200 user created."
    }
    return JSON.parse(JSON.stringify(options))
  }
}