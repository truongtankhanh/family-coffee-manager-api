import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserLoginRequestDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\+?\d+$/)
  @MaxLength(20)
  @IsNotEmpty()
  readonly phone_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
