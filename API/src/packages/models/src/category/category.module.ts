import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'family-coffee-coredb';
import { HttpExceptionService } from '../../../../packages/services';

import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [],
  exports: [CategoryService],
  providers: [CategoryService, HttpExceptionService],
})
export class CategoryModule {}
