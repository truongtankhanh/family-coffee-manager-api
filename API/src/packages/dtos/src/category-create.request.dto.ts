import { ACTIVE_STATUS, ActiveStatus } from 'family-coffee-coredb';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CategoryCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ACTIVE_STATUS))
  readonly is_active: ActiveStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(36)
  readonly parent_id: string;
}
