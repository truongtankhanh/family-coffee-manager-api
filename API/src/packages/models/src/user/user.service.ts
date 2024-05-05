import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity, ROLE_TYPE } from 'family-coffee-coredb';
import {
  PaginationRequestDto,
  PaginationResponseDto,
  UserCreateRequestDto,
  UserLoginRequestDto,
} from '../../../../packages/dtos';
import { omit } from 'lodash';

import { BaseService } from '../base.service';
import { HttpExceptionService } from '../../../../packages/services';

@Injectable()
export class UserService {
  private service: BaseService<UserEntity>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    this.service = new BaseService<UserEntity>(this.dataSource.getRepository(UserEntity));
  }

  public async getAll() {
    try {
      const entities = await this.service.find({ withDeleted: false });
      return entities.map(e => omit(e, ['password', 'jwtToken']));
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  public async getById(id: string) {
    try {
      const entity = await this.service.findOne({
        where: { id },
        relations: ['role'],
      });

      if (!entity) {
        throw this.httpExceptionService.notFoundRequests(`Entity ${id} not found`);
      }

      if (entity.role.name !== ROLE_TYPE.ADMIN) {
        throw this.httpExceptionService.unAuthorizedRequests('User is not authorized');
      }

      return entity;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  public async getWithPagination(
    object: PaginationRequestDto,
  ): Promise<PaginationResponseDto<UserEntity>> {
    const { page, limit } = object;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.service.find({
        skip: skippedItems,
        take: limit,
        withDeleted: false,
      });

      return {
        nextPage: page + 1,
        data,
      };
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  public async updateById(id: string, object: UserCreateRequestDto) {
    try {
      const entity = await this.getById(id);

      const obj = Object.assign(entity, object);
      return await this.service.saveEntity(obj);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  public async softDeleteById(id: string) {
    try {
      const entity = await this.getById(id);

      return await this.service.softRemoveEntity(entity);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  public async register(object: UserCreateRequestDto) {
    const hashedPassword = this.hashPassword(object.password);

    try {
      const actualEntity = await this.service.findOne({
        where: { email: object.email, phoneNumber: object.phone_number },
      });
      if (actualEntity) return omit(actualEntity, ['password']);

      const token = this.generateToken(JSON.stringify(object));

      const entity = new UserEntity();
      entity.email = object.email;
      entity.password = hashedPassword;
      entity.fullName = object.full_name;
      entity.address = object.address;
      entity.phoneNumber = object.phone_number;
      entity.isActive = object.is_active;
      entity.roleId = object.role_id;
      entity.jwtToken = token;

      const resEntity = await this.service.saveEntity(entity);

      return omit(resEntity, ['password']);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  public async login(object: UserLoginRequestDto) {
    const { phone_number, password } = object;

    try {
      const entity = await this.service.findOne({
        where: { phoneNumber: phone_number },
      });

      if (!entity || !this.verifyPassword(password, entity.password)) {
        throw this.httpExceptionService.unAuthorizedRequests('Invalid phone number or password');
      }

      return omit(entity, ['password']) || null;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private verifyPassword(plainPassword: string, hashedPassword: string): boolean {
    return this.hashPassword(plainPassword) === hashedPassword;
  }

  private generateToken(object: string): string {
    // Create a hash of the user data string using a secure algorithm
    const hash = crypto.createHash('sha256').update(object).digest('hex');

    // Generate a random token using a cryptographically secure random number generator
    const randomBytes = crypto.randomBytes(32);
    const randomToken = randomBytes.toString('hex');

    // Combine the hash and random token to create the final token
    return `${hash}:${randomToken}`;
  }

  private checkIsAdmin = async (token: string) => {
    try {
      const entity = await this.service.findOne({
        where: { jwtToken: token },
        relations: ['role'],
      });

      if (!entity) {
        throw this.httpExceptionService.notFoundRequests(`Entity not found`);
      }

      return entity.role.name === ROLE_TYPE.ADMIN;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  };
}
