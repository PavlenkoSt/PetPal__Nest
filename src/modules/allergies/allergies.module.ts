import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AllergiesService } from './allergies.service';
import { AllergiesController } from './allergies.controller';
import { AllergiesRepository } from './allergies.repository';
import { Allergy, AllergySchema } from './schemas/allergy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Allergy.name, schema: AllergySchema }]),
  ],
  controllers: [AllergiesController],
  providers: [AllergiesService, AllergiesRepository],
})
export class AllergiesModule {}
