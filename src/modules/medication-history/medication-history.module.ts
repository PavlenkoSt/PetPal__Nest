import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { MedicationHistoryService } from './medication-history.service';
import { MedicationHistoryController } from './medication-history.controller';
import { MedicationHistoryRepository } from './medication-history.repository';
import { Pet, PetSchema } from '../pets/schemas/pet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pet.name,
        schema: PetSchema,
      },
    ]),
  ],
  controllers: [MedicationHistoryController],
  providers: [MedicationHistoryService, MedicationHistoryRepository],
})
export class MedicationHistoryModule {}
