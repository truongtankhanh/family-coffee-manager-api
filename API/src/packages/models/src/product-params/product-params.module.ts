import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductParamsEnity } from 'family-coffee-coredb';

import { ProductParamsService } from './product-params.service';
import { HttpExceptionService } from '../../../../packages/services';

@Module({
  imports: [TypeOrmModule.forFeature([ProductParamsEnity])],
  exports: [ProductParamsService],
  providers: [ProductParamsService, HttpExceptionService],
})
export class ProductParamsModule {}
