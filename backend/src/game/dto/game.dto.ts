class GameDto {
    gameId: number;
    p1nick: string;
    p2nick: string;
    p1Score: number;
    p2Score: number;
}
class CurrentGameDto {
    gameId : number;
    p1nick : string;
    p2nick : string;
}
export {GameDto, CurrentGameDto};