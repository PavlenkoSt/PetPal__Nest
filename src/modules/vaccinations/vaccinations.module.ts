import { Module } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationsController } from './vaccinations.controller';

@Module({
  controllers: [VaccinationsController],
  providers: [VaccinationsService]
})
export class VaccinationsModule {}
