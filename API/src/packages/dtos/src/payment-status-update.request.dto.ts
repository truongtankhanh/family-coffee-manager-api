import { ApiProperty } from '@nestjs/swagger';
import { PAYMENT_STATUS } from 'family-coffee-coredb';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class PaymentStatusUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.keys(PAYMENT_STATUS))
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
