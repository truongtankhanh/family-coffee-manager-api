import { ProductService } from 'src/packages/models';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationRequestDto, ProductCreateRequestDto, ProductUpdateRequestDto } from 'src/packages/dtos';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({ status: 200, description: 'Returns all product' })
  async getAllProducts() {
    return this.service.getAll();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get products with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated products' })
  async getWithPagination(@Query() object: PaginationRequestDto) {
    return this.service.getWithPagination(object);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an product by ID' })
  @ApiResponse({ status: 200, description: 'Returns an product by ID' })
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Creates a new product' })
  async create(@Body() object: ProductCreateRequestDto) {
    return this.service.create(object);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an product by ID' })
  @ApiResponse({ status: 200, description: 'Updates an product by ID' })
  async updateById(@Param('id') id: string, @Body() object: ProductUpdateRequestDto) {
    return this.service.updateById(id, object);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an product by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an product by ID' })
  async deleteById(@Param('id') id: string) {
    return this.service.softDeleteById(id);
  }
}
