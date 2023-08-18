import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { VaccinationsService } from './vaccinations.service';
import { VaccinationsController } from './vaccinations.controller';
import { VaccinationsRepository } from './vaccinations.repository';
import { Vaccination, VaccinationSchema } from './schemas/vaccination.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vaccination.name, schema: VaccinationSchema },
    ]),
  ],
  controllers: [VaccinationsController],
  providers: [VaccinationsService, VaccinationsRepository],
})
export class VaccinationsModule {}
