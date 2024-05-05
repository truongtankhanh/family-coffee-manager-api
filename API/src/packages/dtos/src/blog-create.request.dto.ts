import { ApiProperty } from '@nestjs/swagger';
import { ACTIVE_STATUS } from 'family-coffee-coredb';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BlogCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ACTIVE_STATUS))
  readonly is_active: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly user_id: string;
}
