import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
