import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersService, HttpExceptionService } from '../../../../packages/services';

// Entity
import { UserEntity } from 'family-coffee-coredb';

// Service
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  exports: [UserService],
  providers: [UserService, HttpExceptionService, HelpersService],
})
export class UserModule {}
