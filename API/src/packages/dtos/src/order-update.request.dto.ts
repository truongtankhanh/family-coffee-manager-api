import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class OrderUpdateRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly total_amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly delivery_address: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly delivery_fee: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly note: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly order_status_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly payment_status_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly paid_at: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly cancel_at: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly user_id: string;
}
