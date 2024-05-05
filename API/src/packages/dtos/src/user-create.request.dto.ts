import { ApiProperty } from '@nestjs/swagger';
import { ACTIVE_STATUS, ActiveStatus } from 'family-coffee-coredb';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateRequestDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\+?\d+$/)
  @MaxLength(20)
  @IsNotEmpty()
  readonly phone_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ACTIVE_STATUS))
  readonly is_active: ActiveStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly role_id: string;
}
