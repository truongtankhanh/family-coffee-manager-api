import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionService } from '../../../../packages/services';

// Entity
import { UserRoleEntity } from 'family-coffee-coredb';

// Service
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  exports: [UserRoleService],
  providers: [UserRoleService, HttpExceptionService],
})
export class UserRoleModule {}
