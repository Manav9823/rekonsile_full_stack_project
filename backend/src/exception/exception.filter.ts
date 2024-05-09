/* eslint-disable prettier/prettier */
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';  

  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly loggingService: LoggingService) {}
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal Server Error';
  
      this.loggingService.error(
        `${request.method} ${request.url}`
      );
  
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
  