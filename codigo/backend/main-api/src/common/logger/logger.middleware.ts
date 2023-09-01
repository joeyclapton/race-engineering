import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { buildLogContent, getResponseBody } from './logger.utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('API');

  use(request: Request, response: Response, next: NextFunction): void {
    request.headers['x-request-time'] = Date.now().toString();
    getResponseBody(response);
    response.on('finish', () => {
      const { statusCode } = response;
      const logContent = buildLogContent(request, response);
      if (statusCode < 400) {
        this.logger.log(logContent.logMessage);
      }
      if (statusCode >= 400) {
        this.logger.error(logContent.logMessage);
      }
    });

    next();
  }
}
