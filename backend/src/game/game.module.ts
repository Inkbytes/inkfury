import { Module } from '@nestjs/common';
import { GameGateway } from './game.event.gateway';

@Module({
	providers: [GameGateway],
})
export class GameModule {}
