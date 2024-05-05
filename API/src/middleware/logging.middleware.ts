import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Ghi log request
    Logger.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);
    if (req.method !== 'GET') {
      Logger.log(`Request body: ${JSON.stringify(req.body)}`);
    }

    const start = new Date().getTime();
    // Ghi log response
    res.on('finish', () => {
      const duration = new Date().getTime() - start;
      Logger.log(
        `[${new Date().toLocaleString()}] ${res.statusCode} ${req.method} ${
          req.originalUrl
        } - ${duration}ms`,
      );
    });

    next();
  }
}
