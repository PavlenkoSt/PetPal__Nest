import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

import { ICurrentUser } from 'src/decorators/user.decorator';
import { PET_NOT_FOUND } from './pets.constants';
import { PetsRepository } from './pets.repository';
import { UsersRepository } from '../users/users.repository';
import { VaccinationsRepository } from '../vaccinations/vaccinations.repository';
import { AllergiesRepository } from '../allergies/allergies.repository';

@Injectable()
export class PetsService {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly vaccinationsRepository: VaccinationsRepository,
    private readonly allergiesRepository: AllergiesRepository,
  ) {}

  async create(createPetDto: CreatePetDto, currentUser: ICurrentUser) {
    const created = await this.petsRepository.create({
      ...createPetDto,
      ownerId: currentUser.id,
    });

    await this.usersRepository.addPet(String(currentUser.id), created.id);

    return created;
  }

  findAll(currentUser: ICurrentUser) {
    return this.petsRepository.getAllByOwnerId(currentUser.id);
  }

  findOne(id: string) {
    return this.petsRepository.getById(id);
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    return this.petsRepository.update(id, updatePetDto);
  }

  async remove(id: string, user: ICurrentUser) {
    const res = await this.petsRepository.removeByIdAndOwnerId(id, user.id);

    if (!res) {
      throw new NotFoundException({
        message: PET_NOT_FOUND,
      });
    } else {
      await Promise.all([
        this.vaccinationsRepository.deleteAllByPetId(id),
        this.usersRepository.removePet(String(user.id), id),
        this.allergiesRepository.deleteAllByPetId(id),
      ]);
    }

    return res;
  }
}
