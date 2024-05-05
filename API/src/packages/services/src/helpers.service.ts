import { Injectable } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class HelpersService {
  extractToken = (headers: Headers | IncomingHttpHeaders) => {
    const authorizationHeader: string = headers['authorization'] || '';
    return authorizationHeader && authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.substring(7)
      : '';
  };
}
