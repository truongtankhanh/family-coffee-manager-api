import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { PaymentEntity } from 'family-coffee-coredb';

// Service
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [],
  exports: [PaymentService],
  providers: [PaymentService, HttpExceptionService],
})
export class PaymentModule {}
