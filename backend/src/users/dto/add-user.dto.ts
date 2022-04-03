import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'The user should have an id!' })
  @IsInt()
  id: number;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsString()
  fullname: string;

  @IsNotEmpty({ message: 'The user should have a login!' })
  @IsString()
  login: string;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsString()
  avatar: string;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsNumber({}, { each: true })
  friendList: number[];

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsNumber({}, { each: true })
  roomList: number[];

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsBoolean()
  status: boolean;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsInt()
  statsId?: number;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsInt()
  matchHistoryId?: number;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsBoolean()
  is2fa: boolean;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsString()
  token: string;

  @IsNotEmpty({ message: 'The user should have a fullname!' })
  @IsNumber({}, { each: true })
  blockeUsers: number[];
}
