import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../users/dto/add-user.dto';
import { TfaService } from './tfa.service';

@Controller('tfa')
export class TfaController {
    constructor(private readonly tfaService : TfaService) {
    }

    @Post('verify')
    tfaSend(@Body() user) {
        return this.tfaService.sendFaemail(user);
    }

    @Post()
    tfaVerify(@Body() data) {
        return this.tfaService.verifyUser(data.code);
    }
}
