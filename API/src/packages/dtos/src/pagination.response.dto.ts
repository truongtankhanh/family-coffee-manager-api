import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class PaginationResponseDto<T> {
  @ApiProperty()
  @IsNumber()
  nextPage: number;

  @ApiProperty()
  @IsArray()
  data: T[];
}
