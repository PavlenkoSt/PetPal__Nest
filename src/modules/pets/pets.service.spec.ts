import { ObjectId as NativeObjectId } from 'mongodb';
import { ObjectId } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { PetsService } from './pets.service';
import { PetsRepository } from './pets.repository';
import { UsersRepository } from '../users/users.repository';
import {
  allergiesRepositoryMock,
  petsRepositoryMock,
  usersRepositoryMock,
  vaccinationsRepositoryMock,
  vetVisitRepositoryMock,
} from 'src/helpers/mocks';
import { ICurrentUser } from 'src/decorators/user.decorator';
import { UpdatePetDto } from './dto/update-pet.dto';
import { VaccinationsRepository } from '../vaccinations/vaccinations.repository';
import { VetVisitRepository } from '../vet-visit/vet-visit.repository';
import { AllergiesRepository } from '../allergies/allergies.repository';

describe('PetsService', () => {
  const user: ICurrentUser = {
    login: 'testUser',
    id: new NativeObjectId(123) as unknown as ObjectId,
  };

  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        {
          provide: PetsRepository,
          useValue: petsRepositoryMock,
        },
        { provide: UsersRepository, useValue: usersRepositoryMock },
        {
          provide: VaccinationsRepository,
          useValue: vaccinationsRepositoryMock,
        },
        {
          provide: VetVisitRepository,
          useValue: vetVisitRepositoryMock,
        },
        { provide: AllergiesRepository, useValue: allergiesRepositoryMock },
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('pet creation', async () => {
    const breed = 'hasky';
    const name = 'Jessy';
    const dateOfBirth = new Date().toISOString();

    const pet = await service.create({ breed, dateOfBirth, name }, user);

    expect(usersRepositoryMock.addPet).toBeCalledTimes(1);

    expect(pet).toBeDefined();
    expect(pet.name).toBe(name);
    expect(pet.dateOfBirth).toBe(dateOfBirth);
    expect(pet.breed).toBe(breed);
  });

  it('pet removing', async () => {
    const petId = '12341';

    const removed = await service.remove(petId, user);

    expect(usersRepositoryMock.removePet).toBeCalledTimes(1);

    expect(removed).toBeDefined();
  });

  it('pet editing', async () => {
    const id = '123124';
    const updatePetDto: UpdatePetDto = {
      name: 'Belka',
      breed: 'Shpits',
      dateOfBirth: new Date(2008, 1, 1).toISOString(),
    };

    const editedPet = await service.update(id, updatePetDto);

    expect(editedPet).toBeDefined();
    expect(editedPet.name).toBe(updatePetDto.name);
    expect(editedPet.breed).toBe(updatePetDto.breed);
    expect(editedPet.dateOfBirth).toBe(updatePetDto.dateOfBirth);
  });
});
