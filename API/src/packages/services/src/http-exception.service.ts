import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class HttpExceptionService {
  tooManyRequests(message: string): HttpException {
    return new HttpException(message, HttpStatus.TOO_MANY_REQUESTS);
  }

  notFoundRequests(message: string): HttpException {
    return new HttpException(message, HttpStatus.NOT_FOUND);
  }

  unAuthorizedRequests(message: string): HttpException {
    return new HttpException(message, HttpStatus.UNAUTHORIZED);
  }
}
