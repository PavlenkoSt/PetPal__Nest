import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Allergy } from './schemas/allergy.schema';

import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

@Injectable()
export class AllergiesRepository {
  constructor(
    @InjectModel(Allergy.name) private readonly allergyModel: Model<Allergy>,
  ) {}

  create(dto: CreateAllergyDto) {
    return this.allergyModel.create(dto);
  }

  update(id: string, dto: UpdateAllergyDto) {
    return this.allergyModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  delete(id: string) {
    return this.allergyModel.findByIdAndDelete(id);
  }

  getAllByPetId(id) {
    return this.allergyModel.find({ petId: id }, { petId: 0 });
  }

  getById(id: string) {
    return this.allergyModel.findById(id);
  }
}
