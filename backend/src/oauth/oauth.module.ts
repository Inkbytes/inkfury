import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({    
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
    })],
    controllers: [OauthController],
    providers: [OauthService],
})
export class OauthModule {}