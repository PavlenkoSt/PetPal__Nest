import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [TerminusModule.forRoot({ errorLogStyle: 'pretty' }), HttpModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
