import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetsRepository } from './pets.repository';
import { UsersModule } from '../users/users.module';
import { VaccinationsModule } from '../vaccinations/vaccinations.module';
import { AllergiesModule } from '../allergies/allergies.module';
import { VetVisitModule } from '../vet-visit/vet-visit.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    UsersModule,
    VaccinationsModule,
    AllergiesModule,
    VetVisitModule,
  ],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
  exports: [PetsRepository],
})
export class PetsModule {}
