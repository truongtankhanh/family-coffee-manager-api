import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/packages/models';
import { UserCreateRequestDto } from 'src/packages/dtos';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly service: UserService) {}

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ValidationPipe())
  async updateById(@Param('id') id: string, @Body() object: UserCreateRequestDto) {
    return this.service.updateById(id, object);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ValidationPipe())
  async deleteById(@Param('id') id: string) {
    return this.service.softDeleteById(id);
  }
}
