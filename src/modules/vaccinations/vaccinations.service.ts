import { Injectable } from '@nestjs/common';

import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { VaccinationsRepository } from './vaccinations.repository';

@Injectable()
export class VaccinationsService {
  constructor(
    private readonly vaccinationsRepository: VaccinationsRepository,
  ) {}

  create(createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationsRepository.create(createVaccinationDto);
  }

  findAllByPetId(petId: string) {
    return this.vaccinationsRepository.getAllByPetId(petId);
  }

  findOne(id: string) {
    return this.vaccinationsRepository.getOneById(id);
  }

  update(id: string, updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationsRepository.update(id, updateVaccinationDto);
  }

  deleteAllByPetId(petId: string) {
    return this.vaccinationsRepository.deleteAllByPetId(petId);
  }

  delete(id: string) {
    return this.vaccinationsRepository.delete(id);
  }
}
