import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentGameEntity, GameEntity } from '../entities/game.entity';
import { Repository } from 'typeorm';
import { CurrentGameDto, GameDto } from './dto/game.dto';

@Injectable()
export class GameService {
    constructor(@InjectRepository(GameEntity) private readonly gamerepo : Repository<GameEntity>, @InjectRepository(CurrentGameEntity) private readonly currentGameRepo : Repository<CurrentGameEntity>){}
    
// save game    
    public async CreateCurrentMatch(game : CurrentGameDto) : Promise<CurrentGameDto>{
        if (!this.GameCurrentSearch(game))
            return this.currentGameRepo.save(game);
        return this.currentGameRepo.findOne(game);
    }

    public async CreateCompletedGame(game : GameDto) : Promise<GameDto> {
        if (!this.GameSearch(game))
            return this.gamerepo.save(game);
        return this.gamerepo.findOne(game);
    }

    public async GameSearch(game : GameDto) : Promise<Boolean> {
        if (this.gamerepo.findOne(game))
            return true;
        return false;
    }

    public async GameCurrentSearch(game : CurrentGameEntity) : Promise<Boolean> {
        if (this.currentGameRepo.findOne(game))
            return true;
        return false;
    }

// delete curentgame by gameId

// search currentgame by playernick
}
