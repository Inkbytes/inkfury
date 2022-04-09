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
  @IsNumber()
  id: number;

  // @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  login?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  friendList: number[];

  // @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsOptional()
  @IsNumber({}, { each: true })
  roomList?: number[];

  @IsOptional()
  @IsBoolean()
  status: boolean;

  // @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsOptional()
  @IsNumber()
  statsId?: number;

  @IsOptional()
  @IsNumber()
  matchHistoryId?: number;

  @IsOptional()
  @IsBoolean()
  is2fa?: boolean;

  @IsOptional()
  @IsNumber()
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
