import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { ProductCategoryEntity } from 'family-coffee-coredb';

// Service
import { ProductCategoryService } from './product-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [],
  exports: [ProductCategoryService],
  providers: [ProductCategoryService, HttpExceptionService],
})
export class ProductCategoryModule {}
