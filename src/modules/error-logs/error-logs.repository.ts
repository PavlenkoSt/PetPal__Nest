import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ErrorLog } from './schemas/error-log.schema';
import { CreateErrorLogDto } from './dto/create-error-log.dto';

@Injectable()
export class ErrorLogsRepository {
  constructor(
    @InjectModel(ErrorLog.name)
    private readonly errorLogSchema: Model<ErrorLog>,
  ) {}

  saveLog(log: CreateErrorLogDto) {
    return this.errorLogSchema.create(log);
  }
}
