import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { S3LoggerService } from 'src/aws/s3-logger.service';
import { ErrorLogsService } from 'src/modules/error-logs/error-logs.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(S3LoggerService) private readonly s3LoggerService: S3LoggerService,
    @Inject(ErrorLogsService)
    private readonly errorLogsService: ErrorLogsService,
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

    if (status >= 500) {
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: exception.message || 'Internal server error',
        stack: exception.stack,
        body: JSON.stringify(request.body || {}),
      };

      this.errorLogsService.create({
        dateTime: errorResponse.timestamp,
        message: errorResponse.message,
        method: errorResponse.method,
        path: errorResponse.path,
        stack: errorResponse.stack,
        statusCode: errorResponse.statusCode,
        body: errorResponse.body,
      });

      // this.s3LoggerService.saveLogToS3(
      //   new Date().toDateString() + '.txt',
      //   JSON.stringify(errorResponse),
      // );
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
