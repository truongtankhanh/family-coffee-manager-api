import { ProductParamsService } from 'src/packages/models';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  PaginationRequestDto,
  ProductParamsCreateRequestDto,
  ProductParamsUpdateRequestDto,
} from 'src/packages/dtos';

@ApiTags('Product Params')
@Controller('product-params')
export class ProductParamsController {
  constructor(private readonly service: ProductParamsService) {}

  @Get()
  @ApiResponse({ status: 200 })
  async getAllProducts() {
    return this.service.getAll();
  }

  @Get('pagination')
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200 })
  async getWithPagination(@Query() object: PaginationRequestDto) {
    return this.service.getWithPagination(object);
  }

  @Get(':id')
  @ApiResponse({ status: 200 })
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  @ApiResponse({ status: 201 })
  async create(@Body() object: ProductParamsCreateRequestDto) {
    return this.service.create(object);
  }

  @Put(':id')
  @ApiResponse({ status: 200 })
  async updateById(@Param('id') id: string, @Body() object: ProductParamsUpdateRequestDto) {
    return this.service.updateById(id, object);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteById(@Param('id') id: string) {
    return this.service.softDeleteById(id);
  }
}
