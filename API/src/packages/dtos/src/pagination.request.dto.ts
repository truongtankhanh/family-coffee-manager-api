import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationRequestDto {
  @ApiProperty()
  @IsNumber()
  readonly page: number;

  @ApiProperty()
  @IsNumber()
  readonly limit: number;
}
