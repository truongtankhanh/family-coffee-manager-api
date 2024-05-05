import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ProductCategoryCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly product_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly category_id: string;
}
