import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetsRepository } from './pets.repository';
import { UsersModule } from '../users/users.module';
import { VaccinationsModule } from '../vaccinations/vaccinations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    UsersModule,
    VaccinationsModule,
  ],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
})
export class PetsModule {}
