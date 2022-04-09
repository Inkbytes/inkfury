import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CurrentGameEntity, GameEntity, ScoreGameEntity } from '../entities/game.entity';
import { GameController } from './game.controller';
import { GameGateway } from './game.event.gateaway';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, CurrentGameEntity, ScoreGameEntity, UserEntity]), JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
})
  ],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}
