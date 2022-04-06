import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum RoomVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

// export class RoomDto {
//   id: number;
//   name?: string;
//   owner_id?: number;
//   password?: string;
//   visibility?: RoomVisibility;
//   pw_protected?: boolean;
//   members?: number[];
//   admins?: number[];
//   blocked_members?: number[];
//   muted_members?: number[];
// }

export class RoomDto {

  // @IsNumber()
  // id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsString()
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

// export { RoomDto, RoomVisibility };