import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class OrderHistoryCreateRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly subtotal: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly order_id: string;
}
