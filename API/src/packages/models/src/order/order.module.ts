import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { OrderEntity } from 'family-coffee-coredb';

// Service
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [],
  exports: [OrderService],
  providers: [OrderService, HttpExceptionService],
})
export class OrderModule {}
