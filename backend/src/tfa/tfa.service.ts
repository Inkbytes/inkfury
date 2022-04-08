import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../users/dto/add-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class TfaService {
    private code;

    constructor( @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>, private mailerService: MailerService) {
        this.code = Math.floor(10000 + Math.random() * 90000);
    }

    async sendFaemail(user: UserEntity) {
        const fullname = user.fullname;
        const email = user.email;
        const userd = this.repo.findOne({id: user.id});

        if (!userd) {throw new UnauthorizedException();}
        let code = Math.floor(10000 + Math.random() * 90000);
        this.repo.update({id: user.id}, {authConfirmToken: code.toString()});

        const data =  await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Hamid contrib',
            template: 'confirm',
            context: {
                fullname,
                code: code
            },
        }).then((data) => {
            return data;
        });

        return data.accepted[0];
    }

    async verifyUser(code: string) {
        const user = await this.repo.findOne({authConfirmToken: code});

        if (!user) {
            return false;
        }
        return true;
    }
}
