import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { SystemHealthCheckController } from './system-health-check.controller';

@Module({
  imports: [TerminusModule.forRoot({ errorLogStyle: 'pretty' }), HttpModule],
  controllers: [SystemHealthCheckController],
})
export class SystemHealthCheckModule {}
