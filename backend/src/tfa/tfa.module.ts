import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { TfaController } from './tfa.controller';
import { TfaService } from './tfa.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  MailerModule.forRoot({
    transport: {
    service: "gmail",
    secure: false,
    auth: {
      user: 'inkfury42@gmail.com',
      pass: 'inkinkfury',
    },
    },
    defaults: {
      from: '"No Reply" <youremail@gmail.com>',
    },
    template: {
      dir: join(__dirname, "."),
      adapter: new HandlebarsAdapter(), 
      options: {
        strict: true,
      },
    },
  }),],
  controllers: [TfaController],
  providers: [TfaService, UsersService]
})
export class TfaModule {}
