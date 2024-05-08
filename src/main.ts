/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
// import { LoggingMiddleware } from './logging/logging.middleware';
// import { WinstonModule } from 'nest-winston';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
  });
  await app.listen(3000);
}
bootstrap();
