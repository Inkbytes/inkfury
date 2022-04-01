import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CurrentGameDto, GameDto } from './dto/game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('completed')
  async GetCompletedGames() {
    return this.gameService.GetCompletedGames();
  }

  @Post('completed')
  async CreateCompGame(@Req() req, @Body() game: GameDto) {
    // if (!req.rawHeaders.cookies['access_token']) throw new UnauthorizedException();
    return this.gameService.CreateCompletedGame(game);
  }

  @Get('current')
  async getCurrentGames() {
    return await this.gameService.GetCurrentGames();
  }
  @Get('current/:login')
  async getCurrentGame(@Param('login') login: string) {
    return await this.gameService.FindCurrentGameByNickname(login);
  }

  @Post('current')
  async CreateGame(@Req() req, @Body() game: CurrentGameDto) {
    // console.log(req);
    // if (!req.rawHeaders.cookies['access_token']) throw new UnauthorizedException();
    return this.gameService.CreateCurrentMatch(game);
  }

  @Delete('current/:gameId')
  async DeleteCurrentGame(@Param('gameId') gameId: number) {
    return await this.gameService.DeleteCurrentGameById(gameId);
  }
}
