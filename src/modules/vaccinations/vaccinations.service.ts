import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { VaccinationsRepository } from './vaccinations.repository';
import { VACCINATION_NOT_FOUND } from './vaccinations.constants';

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

  async findOne(id: string) {
    const result = await this.vaccinationsRepository.getOneById(id);

    if (!result) {
      throw new NotFoundException(VACCINATION_NOT_FOUND);
    }

    return result;
  }

  async update(id: string, updateVaccinationDto: UpdateVaccinationDto) {
    const updated = await this.vaccinationsRepository.update(
      id,
      updateVaccinationDto,
    );

    if (!updated) {
      throw new NotFoundException(VACCINATION_NOT_FOUND);
    }

    return updated;
  }

  deleteAllByPetId(petId: string) {
    return this.vaccinationsRepository.deleteAllByPetId(petId);
  }

  async delete(id: string) {
    const deleted = await this.vaccinationsRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(VACCINATION_NOT_FOUND);
    }

    return deleted;
  }
}
