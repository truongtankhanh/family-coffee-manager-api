import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { UserEntity } from 'family-coffee-coredb';
import { HelpersService } from '../packages/services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly helpersService: HelpersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.helpersService.extractToken(req.headers);
    try {
      if (req.baseUrl.includes('/user/')) return next();

      const entity = await this.userRepo.findOne({
        where: { jwtToken: token },
      });

      if (entity) return next();

      throw new Error();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        time: new Date().toLocaleString(),
        path: req.originalUrl,
        message: 'Unauthorized',
      });
    }
  }
}
