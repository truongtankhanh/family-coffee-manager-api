import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProductImageEntity } from 'family-coffee-coredb';
import {
  PaginationRequestDto,
  PaginationResponseDto,
  ProductImageCreateRequestDto,
  ProductImageUpdateRequestDto,
} from '../../../../packages/dtos';

import { BaseService } from '../base.service';
import { HttpExceptionService } from '../../../../packages/services';

@Injectable()
export class ProductImageService {
  private service: BaseService<ProductImageEntity>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    this.service = new BaseService<ProductImageEntity>(
      this.dataSource.getRepository(ProductImageEntity),
    );
  }

  public async getAll() {
    try {
      return await this.service.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getById(id: string) {
    try {
      const entity = await this.service.findOne({ where: { id } });

      if (!entity) {
        throw this.httpExceptionService.notFoundRequests(`Entity ${id} not found`);
      }

      return entity;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getWithPagination(
    object: PaginationRequestDto,
  ): Promise<PaginationResponseDto<ProductImageEntity>> {
    const { page, limit } = object;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.service.find({
        skip: skippedItems,
        take: limit,
        withDeleted: false,
      });

      return {
        nextPage: page + 1,
        data,
      };
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async create(object: ProductImageCreateRequestDto) {
    try {
      const entity = new ProductImageEntity();
      entity.productId = object.product_id;
      entity.imageUrl = object.image_url;
      entity.isMain = object.is_main;
      entity.thumbnailUrl = object.thumbnail_url;

      const obj = this.service.createEntity(entity);
      return await this.service.saveEntity(obj);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateById(id: string, object: ProductImageUpdateRequestDto) {
    try {
      const entity = await this.getById(id);

      const obj = Object.assign(entity, object);
      return await this.service.saveEntity(obj);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async softDeleteById(id: string) {
    try {
      const entity = await this.getById(id);

      return await this.service.softRemoveEntity(entity);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
