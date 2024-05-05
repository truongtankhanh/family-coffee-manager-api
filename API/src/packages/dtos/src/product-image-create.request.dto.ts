import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Validate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductImageCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly product_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsUrl)
  readonly image_url: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly is_main: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(IsUrl)
  readonly thumbnail_url: string;
}
