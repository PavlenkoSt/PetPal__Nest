import { Injectable } from '@nestjs/common';

import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

import { AllergiesRepository } from './allergies.repository';

@Injectable()
export class AllergiesService {
  constructor(private readonly allergiesRepository: AllergiesRepository) {}

  create(createAllergyDto: CreateAllergyDto) {
    return this.allergiesRepository.create(createAllergyDto);
  }

  findAll(petId: string) {
    return this.allergiesRepository.getAllByPetId(petId);
  }

  findOne(id: string) {
    return this.allergiesRepository.getById(id);
  }

  update(id: string, updateAllegryDto: UpdateAllergyDto) {
    return this.allergiesRepository.update(id, updateAllegryDto);
  }

  remove(id: string) {
    return this.allergiesRepository.delete(id);
  }
}
