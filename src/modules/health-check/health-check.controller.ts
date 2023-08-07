import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

import { Public } from 'src/decorators/public.decorator';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private disk: DiskHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
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
