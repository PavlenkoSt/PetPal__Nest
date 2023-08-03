import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { S3LoggerService } from 'src/aws/s3-logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(S3LoggerService) private readonly s3LoggerService: S3LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<any>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message || 'Internal server error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: exception.message || 'Internal server error',
        stack: exception.stack,
      };

      this.s3LoggerService.saveLogToS3(
        new Date().toDateString() + '.txt',
        JSON.stringify(errorResponse),
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
