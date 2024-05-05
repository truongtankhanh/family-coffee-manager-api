import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserEntity, typeormConfig } from 'family-coffee-coredb';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {
  CategoryModule,
  OrderHistoryModule,
  OrderModule,
  OrderStatusModule,
  PaymentHistoryModule,
  PaymentModule,
  PaymentStatusModule,
  ProductCategoryModule,
  ProductImageModule,
  ProductModule,
  ProductParamsModule,
  UserModule,
  UserRoleModule,
} from './packages/models';
import { HttpExceptionFilter } from './filters';
import { HelpersService } from './packages/services';
import { ResponseFormattingInterceptor } from './interceptors';
import { AuthMiddleware, LoggingMiddleware } from './middleware';
import {
  AdminController,
  CategoryController,
  OrderController,
  OrderHistoryController,
  OrderStatusController,
  PaymentController,
  PaymentHistoryController,
  PaymentStatusController,
  ProductCategoryController,
  ProductController,
  ProductImageController,
  ProductParamsController,
  UserController,
  UserRoleController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UserEntity]),
    CategoryModule,
    OrderModule,
    OrderStatusModule,
    OrderHistoryModule,
    PaymentModule,
    PaymentStatusModule,
    PaymentHistoryModule,
    ProductModule,
    ProductParamsModule,
    ProductCategoryModule,
    ProductImageModule,
    UserModule,
    UserRoleModule,
  ],
  controllers: [
    AdminController,
    UserController,
    ProductController,
    ProductCategoryController,
    ProductImageController,
    CategoryController,
    PaymentController,
    PaymentHistoryController,
    OrderController,
    OrderHistoryController,
    UserRoleController,
    OrderStatusController,
    PaymentStatusController,
    ProductParamsController,
  ],
  providers: [
    HelpersService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormattingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/admin', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
