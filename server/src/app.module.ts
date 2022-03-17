import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import { GameGateway } from './GameGateway/event.gateway';

@Module({
  imports: [
	  ServeStaticModule.forRoot({
		  rootPath: '/Users/ztaouil/Projects/inkfury/client',
	  }),
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway],
})
export class AppModule {}
