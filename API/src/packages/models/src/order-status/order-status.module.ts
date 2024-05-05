import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';
import { OrderStatusEntity } from 'family-coffee-coredb';

import { OrderStatusService } from './order-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity])],
  exports: [OrderStatusService],
  providers: [OrderStatusService, HttpExceptionService],
})
export class OrderStatusModule {}
