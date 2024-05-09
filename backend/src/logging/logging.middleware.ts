/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {
    try{
        // console.log('inside const')
    } catch(err) {
        // console.log(err)
    }
  }
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('inside use')
    const { method, originalUrl, body, query } = req;
    const start = Date.now();
    // console.log('in logging service')
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.loggingService.log(
        `${method} ${originalUrl} ${JSON.stringify(query)} ${JSON.stringify(
          body,
        )} ${res.statusCode} ${duration}ms`,
      );
    });

    next();
  }
}
