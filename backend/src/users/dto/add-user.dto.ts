import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'The user should have an id!' })
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty({ message: 'The user should have a login!' })
  @IsString()
  login?: string;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  friendList?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  roomList?: number[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsInt()
  statsId?: number;

  @IsOptional()
  @IsInt()
  matchHistoryId?: number;

  @IsOptional()
  @IsBoolean()
  is2fa?: boolean;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  blockeUsers?: number[];

  @IsOptional()
  @IsString()
  authConfirmToken?: string;

  @IsOptional()
  @IsBoolean()
  isLogged?: boolean;

  @IsOptional()
  @IsBoolean()
  inGame?: boolean;

  @IsOptional()
  @IsBoolean()
  isFirst?: boolean;
}
