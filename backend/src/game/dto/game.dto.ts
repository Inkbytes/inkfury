import { IsNumber, IsOptional } from "class-validator";

class GameDto {
  @IsNumber()
  gameId: number;

  @IsOptional()
  @IsNumber()
  p1id?: number;
  @IsOptional()
  @IsNumber()
  p2id?: number;
  @IsOptional()
  @IsNumber()
  p1Score?: number;
  @IsOptional()
  @IsNumber()
  p2Score?: number;
}

class CurrentGameDto {
  @IsNumber()
  gameId: number;
  
  @IsOptional()
  @IsNumber()
  p1id?: number;

  @IsOptional()
  @IsNumber()
  p2id?: number;
}
class ScoreGameDto{
	@IsNumber()

	userId: number;
	@IsNumber()
	@IsOptional()
	wins?: number;
}
export { GameDto, CurrentGameDto, ScoreGameDto };
