import { Body, Controller, Get, Post , Req, UnauthorizedException} from '@nestjs/common';
import { CurrentGameDto, GameDto } from './dto/game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor (private readonly gameService : GameService){}


    @Post()
    async CreateCompGame(@Req() req , @Body() game : GameDto) {
        if (!req.cookies['access_token'])
            throw new UnauthorizedException();
        return this.gameService.CreateCompletedGame(game);
    }

    @Post()
    async CreateGame(@Req() req, @Body() game : CurrentGameDto) {
        if (!req.cookies['access_token'])
            throw new UnauthorizedException();
        return this.gameService.CreateCurrentMatch(game);
    }
}
