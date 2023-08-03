import { Logger, NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  private readonly logger = new Logger('HTTP');

  use(req: any, res: any, next: (error?: any) => void) {
    const { method, originalUrl, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      const log = `${method} | ${originalUrl} | ${statusCode} | user id: ${
        res.req.user?.id?.toString() || 'null'
      } | request body: ${JSON.stringify(body)} | ${new Date().toISOString()}`;

      this.logger.log(log);
    });

    next();
  }
}
