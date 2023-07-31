import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet, PetSchema } from './schemas/pet.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
