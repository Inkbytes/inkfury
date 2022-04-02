import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentGameEntity, GameEntity } from '../entities/game.entity';
import { GameController } from './game.controller';
import { GameGateway } from './game.event.gateaway';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, CurrentGameEntity])],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}
