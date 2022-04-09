import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Req,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import {GameDto, ScoreGameDto } from './dto/game.dto';
import { GameService } from './game.service';
import { GameEntity } from '../entities/game.entity';
import { Request } from 'express';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('completed')
  async GetCompletedGames(@Req() req : Request) {
    const cookie = req.cookies['jwt'];

    if (!cookie || !this.gameService.verify(cookie))
        throw new UnauthorizedException();
    return this.gameService.GetCompletedGames();
  }
  @Post('completed')
  async CreateCompGame(@Req() req : Request, @Body() game: GameDto) {
    const cookie = req.cookies['jwt'];

    if (!cookie || !this.gameService.verify(cookie))
        throw new UnauthorizedException();
    // if (!req.rawHeaders.cookies['access_token']) throw new UnauthorizedException();
    return this.gameService.CreateCompletedGame(game);
  }

  @Post('score')
  async CreateScoreGame(@Req() req : Request, @Body() score: ScoreGameDto){
    const cookie = req.cookies['jwt'];

    if (!cookie || !this.gameService.verify(cookie))
        throw new UnauthorizedException();
	  return this.gameService.CreateGameScore(score);
  }

  @Get('score/:id')
  async getScoreById(@Req() req : Request, @Param('id') id: number){
    const cookie = req.cookies['jwt'];

    if (!cookie || !this.gameService.verify(cookie))
        throw new UnauthorizedException();
	  return await this.gameService.FindGameScoreById(id);
  }




  @Put('score/:id')
  async ModifyScore(
    @Req() req : Request,
	  @Body() score: ScoreGameDto,
	  @Param('id') id: number,
  ){
    const cookie = req.cookies['jwt'];

    if (!cookie || !this.gameService.verify(cookie))
        throw new UnauthorizedException();
	  return await this.gameService.ModifyScore(id, score);
  }


  @Put('completed/:gameId')
  async ModifieCompletedGame(
    @Req() req : Request,
    @Body() game: GameDto,
    @Param('gameId') gameId: number,
  ) {
    const cookie = req.cookies['jwt'];

    if (!cookie || !this.gameService.verify(cookie))
        throw new UnauthorizedException();
    return await this.gameService.ModifieCompletedGame(gameId, game);
  }
}
