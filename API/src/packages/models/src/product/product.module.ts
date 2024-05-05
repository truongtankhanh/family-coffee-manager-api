import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { ProductEntity } from 'family-coffee-coredb';

// Service
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [],
  exports: [ProductService],
  providers: [ProductService, HttpExceptionService],
})
export class ProductModule {}
