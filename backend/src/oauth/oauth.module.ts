import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({    
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [OauthController],
    providers: [OauthService],
})
export class OauthModule {}
