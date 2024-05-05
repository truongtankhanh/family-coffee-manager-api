import { ApiProperty } from '@nestjs/swagger';
import { ACTIVE_STATUS } from 'family-coffee-coredb';
import { IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class ProductUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ACTIVE_STATUS))
  readonly is_active: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly category_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly product_params_id: string;
}
