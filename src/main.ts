import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import configuration from './config/configuration';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { S3LoggerService } from './aws/s3-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const s3LoggerService = app.get(S3LoggerService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(s3LoggerService));
  app.use(cookieParser());
  app.enableCors();

  await app.listen(configuration().PORT || 3000);
}

bootstrap();
