import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import {configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {UsersService} from "./users/users.service";


@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }