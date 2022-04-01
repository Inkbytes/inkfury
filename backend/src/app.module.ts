import { Module } from '@nestjs/common';
import {configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';
import { ChatModule } from './chat/chat.module';
import { OauthController } from './oauth/oauth.controller';
import { OauthService } from './oauth/oauth.service';
import { OauthModule } from './oauth/oauth.module';


@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        UsersModule,
        GameModule,
        ChatModule,
        OauthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }