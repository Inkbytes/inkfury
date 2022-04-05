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
import { CurrentGameDto, GameDto, ScoreGameDto } from './dto/game.dto';
import { GameService } from './game.service';
import { GameEntity } from '../entities/game.entity';

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

  @Post('score')
  async CreateScoreGame(@Req() req, @Body() score: ScoreGameDto){
	  return this.gameService.CreateGameScore(score);
  }

  @Get('score/:id')
  async getScoreById(@Param('id') id: number){
	  return await this.gameService.FindGameScoreById(id);
  }

  @Get('current')
  async getCurrentGames() {
    return await this.gameService.GetCurrentGames();
  }
  @Get('current/:id')
  async getCurrentGame(@Param('id') id: number) {
    return await this.gameService.FindCurrentGameByNickname(id);
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

  @Put('score/:id')
  async ModifyScore(
	  @Body() score: ScoreGameDto,
	  @Param('id') id: number,
  ){
	  return await this.gameService.ModifyScore(id, score);
  }

  @Put('current/:gameId')
  async ModifieCurrentGame(
    @Body() game: CurrentGameDto,
    @Param('gameId') gameId: number,
  ) {
    return await this.gameService.ModifieCurrentGame(gameId, game);
  }

  @Put('completed/:gameId')
  async ModifieCompletedGame(
    @Body() game: GameDto,
    @Param('gameId') gameId: number,
  ) {
    return await this.gameService.ModifieCompletedGame(gameId, game);
  }
}