import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../src/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
    })],
    controllers: [UsersController],
    providers: [UsersService],
    exports : []
})
export class UsersModule { }