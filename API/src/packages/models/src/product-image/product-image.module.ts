import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { ProductImageEntity } from 'family-coffee-coredb';

// Service
import { ProductImageService } from './product-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImageEntity])],
  controllers: [],
  exports: [ProductImageService],
  providers: [ProductImageService, HttpExceptionService],
})
export class ProductImageModule {}
