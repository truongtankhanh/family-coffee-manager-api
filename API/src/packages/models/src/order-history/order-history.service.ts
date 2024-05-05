import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderHistoryEntity } from 'family-coffee-coredb';
import {
  OrderHistoryCreateRequestDto,
  OrderHistoryUpdateRequestDto,
  PaginationRequestDto,
  PaginationResponseDto,
} from '../../../../packages/dtos';

import { BaseService } from '../base.service';
import { HttpExceptionService } from '../../../../packages/services';

@Injectable()
export class OrderHistoryService {
  private service: BaseService<OrderHistoryEntity>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    this.service = new BaseService<OrderHistoryEntity>(
      this.dataSource.getRepository(OrderHistoryEntity),
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
  ): Promise<PaginationResponseDto<OrderHistoryEntity>> {
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

  async create(object: OrderHistoryCreateRequestDto) {
    try {
      const entity = new OrderHistoryEntity();
      entity.quantity = object.quantity;
      entity.subtotal = object.subtotal;
      entity.orderId = object.order_id;

      const obj = this.service.createEntity(entity);
      return await this.service.saveEntity(obj);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateById(id: string, object: OrderHistoryUpdateRequestDto) {
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
