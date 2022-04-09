import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Matches
} from 'class-validator';

class GameDto {
  @IsNumber()
  gameId: number;
  @IsOptional()
  @IsNumber()
  p1id: number;
  @IsOptional()
  @IsNumber()
  p2id: number;
  @IsOptional()
  @IsNumber()
  p1Score: number;
  @IsOptional()
  @IsNumber()
  p2Score: number;
}

class ScoreGameDto{
  @IsNumber()
	userId: number;
  @IsOptional()
  @IsNumber()
	wins: number;
}
export { GameDto, ScoreGameDto };
