import { ApiProperty } from '@nestjs/swagger';
import { RATING_VALUE } from 'family-coffee-coredb';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RatingCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.keys(RATING_VALUE))
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  readonly value: string;
}
