import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { OrderHistoryEntity } from 'family-coffee-coredb';

// Service
import { OrderHistoryService } from './order-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistoryEntity])],
  controllers: [],
  exports: [OrderHistoryService],
  providers: [OrderHistoryService, HttpExceptionService],
})
export class OrderHistoryModule {}
