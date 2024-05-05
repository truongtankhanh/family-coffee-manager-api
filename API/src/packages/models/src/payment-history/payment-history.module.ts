import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { PaymentHistoryEntity } from 'family-coffee-coredb';

// Service
import { PaymentHistoryService } from './payment-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentHistoryEntity])],
  controllers: [],
  exports: [PaymentHistoryService],
  providers: [PaymentHistoryService, HttpExceptionService],
})
export class PaymentHistoryModule {}
