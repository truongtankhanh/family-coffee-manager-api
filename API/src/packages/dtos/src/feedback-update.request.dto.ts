import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FeedbackUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly restaurant_id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly rate_id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly user_id: string;
}
