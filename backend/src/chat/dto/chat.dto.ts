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

export enum RoomVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class PasswordDto {
  @IsOptional()
  @IsString()
  @Length(8, 24)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password should have 1 uppercase, lowercase letter along with a number and a special character.' })
  password?: string;
}

export class RoomDto {

  // @IsNumber()
  // id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  name?: string;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsString()
  @Length(8, 24)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password should have 1 uppercase, lowercase letter along with a number and a special character.' })
  password?: string;

  @IsOptional()
  @IsEnum(RoomVisibility)
  visibility?: RoomVisibility;

  @IsOptional()
  @IsBoolean()
  pw_protected?: boolean;

  @IsOptional()
  @IsNumber({}, { each: true })
  members?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  admins?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  blocked_members?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  muted_members?: number[];
}
