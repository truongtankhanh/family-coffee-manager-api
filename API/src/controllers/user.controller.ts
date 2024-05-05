import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/packages/models';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationRequestDto, UserCreateRequestDto, UserLoginRequestDto } from 'src/packages/dtos';

@ApiTags('Authencation')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ValidationPipe())
  async getAllProducts() {
    return this.service.getAll();
  }

  @Get('pagination')
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ValidationPipe())
  async getWithPagination(@Req() request: Request, @Query() object: PaginationRequestDto) {
    return this.service.getWithPagination(object);
  }

  @Post('register')
  @ApiBody({ type: UserCreateRequestDto })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ValidationPipe())
  async register(@Body() object: UserCreateRequestDto) {
    return await this.service.register(object);
  }

  @Post('login')
  @ApiBody({ type: UserLoginRequestDto })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid phone number or password',
  })
  @UsePipes(new ValidationPipe())
  async login(@Body() object: UserLoginRequestDto) {
    const entity = await this.service.login(object);
    if (!entity) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
    return entity;
  }
}
