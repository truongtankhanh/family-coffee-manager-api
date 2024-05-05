import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CommentCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly rate_id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly blog_id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly user_id: string;
}
