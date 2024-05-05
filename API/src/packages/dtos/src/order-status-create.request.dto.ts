import { ApiProperty } from '@nestjs/swagger';
import { ORDER_STATUS } from 'family-coffee-coredb';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class OrderStatusCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.keys(ORDER_STATUS))
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
