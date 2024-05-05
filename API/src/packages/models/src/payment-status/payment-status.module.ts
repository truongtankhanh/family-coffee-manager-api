import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatusEntity } from 'family-coffee-coredb';
import { HttpExceptionService } from '../../../../packages/services';

import { PaymentStatusService } from './payment-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  exports: [PaymentStatusService],
  providers: [PaymentStatusService, HttpExceptionService],
})
export class PaymentStatusModule {}
