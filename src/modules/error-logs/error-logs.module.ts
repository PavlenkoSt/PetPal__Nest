import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorLogsService } from './error-logs.service';
import { ErrorLogsRepository } from './error-logs.repository';
import { ErrorLog, ErrorLogSchema } from './schemas/error-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ErrorLog.name, schema: ErrorLogSchema },
    ]),
  ],
  providers: [ErrorLogsService, ErrorLogsRepository],
  exports: [ErrorLogsService],
})
export class ErrorLogsModule {}
