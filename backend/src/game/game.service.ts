import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentGameEntity, GameEntity, ScoreGameEntity } from '../entities/game.entity';
import { Repository } from 'typeorm';
import { CurrentGameDto, GameDto, ScoreGameDto } from './dto/game.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gamerepo: Repository<GameEntity>,
    @InjectRepository(CurrentGameEntity)
    private readonly currentGameRepo: Repository<CurrentGameEntity>,
	@InjectRepository(ScoreGameEntity)
	private readonly scoreGameRepo: Repository<ScoreGameEntity>,
  @InjectRepository(UserEntity) private readonly repo : Repository<UserEntity>,
  private jwtService : JwtService
  ) {}

  // List completed Games
  public async GetCompletedGames() {
    return this.gamerepo.find();
  }

  // List Current games
  public async GetCurrentGames() {
    return this.currentGameRepo.find();
  }

  // save game
  public async CreateCurrentMatch(
    game: CurrentGameDto,
  ): Promise<CurrentGameDto> {
    const Game = await this.GameCurrentSearch(game).then((r) => {
      return r;
    });
    if (!Game) return this.currentGameRepo.save(game);
    return this.currentGameRepo.findOne(game);
  }

  public async CreateCompletedGame(game: GameDto): Promise<GameDto> {
    const completeGame = await this.GameSearch(game).then((r) => {
      return r;
    });
    if (!completeGame) return this.gamerepo.save(game);
    return this.gamerepo.findOne(game);
  }

  public async GameSearch(game: GameDto): Promise<boolean> {
    const Game = await this.gamerepo.findOne(game).then((r) => {
      return r;
    });
    return !!Game;
  }

  public async SearchGameScore(score: ScoreGameDto): Promise<boolean> {
	  const Score = await this.scoreGameRepo.findOne(score).then( (r) => {
		  return r;
	  });
	  return !!Score;
  }

  public async CreateGameScore(score: ScoreGameDto): Promise<ScoreGameDto>{
	  const current_score = await this.SearchGameScore(score).then((r) => {
		  return r;
	  });
	  if (!current_score) return this.scoreGameRepo.save(score);
	  return this.scoreGameRepo.findOne(score);
  }

  public async FindGameScoreById(playerId: number){
	  return await this.scoreGameRepo
	  .findOne({userId: playerId })
	  .then( (score) => {
		  return score;
	  });
  }
  public async GameCurrentSearch(game: CurrentGameEntity): Promise<boolean> {
    const CurrentGame = await this.currentGameRepo.findOne(game).then((r) => {
      return r;
    });
    return !!CurrentGame;
  }

  // delete curentgame by gameId
  public async DeleteCurrentGameById(gameId: number) {
    return await this.currentGameRepo.delete({ gameId: gameId });
  }
  // search currentgame by playernick
  public async FindCurrentGameByNickname(playerId: number) {
    return await this.currentGameRepo
      .findOne({ p1id: playerId })
      .then((currentGame) => {
        if (!currentGame)
          return this.currentGameRepo.findOne({ p2id: playerId });
        return currentGame;
      });
  }
  public async ModifieCurrentGame(gameId: number, game: CurrentGameEntity) {
    return await this.currentGameRepo.update({ gameId: gameId }, game);
  }

  public async ModifieCompletedGame(gameId: number, game: GameEntity) {
    return await this.gamerepo.update({ gameId: gameId }, game);
  }

  public async ModifyScore(id: number, score: ScoreGameEntity){
	  return await this.scoreGameRepo.update({ userId: id}, score);
  }
  public async verify(cookie: string) {
    const data = await this.jwtService.verifyAsync(cookie).then((data) => {
        return data;
    })

    if (!data) 
        return false;
    
    const user = await this.repo.findOne({id: data['id']}).then((user) => {
        return user;
    });

    if (!user)
        return false;
    return true;
}
}
