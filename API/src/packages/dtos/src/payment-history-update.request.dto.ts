import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class PaymentHistoryUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly payment_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  readonly order_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly amount: number;
}
