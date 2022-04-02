import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentGameEntity, GameEntity } from '../entities/game.entity';
import { Repository } from 'typeorm';
import { CurrentGameDto, GameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gamerepo: Repository<GameEntity>,
    @InjectRepository(CurrentGameEntity)
    private readonly currentGameRepo: Repository<CurrentGameEntity>,
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
}
