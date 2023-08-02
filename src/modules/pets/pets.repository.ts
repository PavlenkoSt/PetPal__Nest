import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Pet } from './schemas/pet.schema';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreatePetDto } from './dto/create-pet.dto';

export class PetsRepository {
  constructor(@InjectModel(Pet.name) private petModel: Model<Pet>) {}

  removeByIdAndOwnerId(id: ObjectId, ownerId: string) {
    return this.petModel.findOneAndDelete({
      _id: id,
      ownerId,
    });
  }

  create(pet: CreatePetDto & { ownerId: ObjectId }) {
    return this.petModel.create(pet);
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    return this.petModel.findByIdAndUpdate(id, updatePetDto, {
      new: true,
    });
  }

  getById(id: string) {
    return this.petModel.findById(id);
  }

  getAllByOwnerId(ownerId: ObjectId) {
    return this.petModel.find({ ownerId }, { ownerId: false });
  }
}
