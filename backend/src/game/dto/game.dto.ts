class GameDto {
  gameId: number;
  p1id: number;
  p2id: number;
  p1Score: number;
  p2Score: number;
}
class CurrentGameDto {
  gameId: number;
  p1id?: number;
  p2id?: number;
}
class ScoreGameDto{
	userId: number;
	wins: number;
}
export { GameDto, CurrentGameDto, ScoreGameDto };
