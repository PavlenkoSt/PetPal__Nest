import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

import { Public } from 'src/decorators/public.decorator';

@Controller('system-health-check')
@ApiTags('system-health-check')
export class SystemHealthCheckController {
  constructor(
    private health: HealthCheckService,
    private disk: DiskHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  @ApiOperation({ summary: 'Check api, database and storage' })
  api() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          // for linux will be '/'
          path: 'C:\\',
          // need to decrease
          thresholdPercent: 0.9,
        }),
      () => this.db.pingCheck('database'),
    ]);
  }
}
