import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ACTIVE_STATUS, ActiveStatus } from 'family-coffee-coredb';

export class RestaurantCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

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
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(35)
  @IsNotEmpty()
  readonly working_hours: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly social_media: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ACTIVE_STATUS))
  readonly is_active: ActiveStatus;
}
