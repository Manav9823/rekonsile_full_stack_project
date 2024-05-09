/* eslint-disable prettier/prettier */
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthenticationMiddleware } from './jwt/jwt.authentication.middleware';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './exception/exception.filter';
import { LoggingMiddleware } from './logging/logging.middleware';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
    }),
  ],
  controllers: [AuthController],
  providers: [LoggingMiddleware, LoggingService, AllExceptionsFilter, AuthService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(JwtAuthenticationMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'doc', method: RequestMethod.ALL },
        { path: '/', method: RequestMethod.ALL },
      )
      .forRoutes('*'); 
  }
}