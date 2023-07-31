import { Module } from '@nestjs/common';
import { PetsHealthService } from './pets-health.service';
import { PetsHealthController } from './pets-health.controller';

@Module({
  controllers: [PetsHealthController],
  providers: [PetsHealthService],
})
export class PetsHealthModule {}
