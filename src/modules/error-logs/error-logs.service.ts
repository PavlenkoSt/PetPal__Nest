import { Injectable } from '@nestjs/common';

import { CreateErrorLogDto } from './dto/create-error-log.dto';
import { ErrorLogsRepository } from './error-logs.repository';

@Injectable()
export class ErrorLogsService {
  constructor(private readonly errorLogsRepository: ErrorLogsRepository) {}

  create(createErrorLogDto: CreateErrorLogDto) {
    return this.errorLogsRepository.saveLog(createErrorLogDto);
  }
}
