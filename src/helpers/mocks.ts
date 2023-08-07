import { ObjectId as NativeObjectId } from 'mongodb';
import { ObjectId } from 'mongoose';

import { ICurrentUser } from 'src/decorators/user.decorator';
import { CreatePetDto } from 'src/modules/pets/dto/create-pet.dto';
import { UpdatePetDto } from 'src/modules/pets/dto/update-pet.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { IUserWithHashedPassword } from 'src/modules/users/interfaces/IUserWithHashedPassword';
import { User } from 'src/modules/users/schemas/user.schema';

export const petsRepositoryMock = {
  removeByIdAndOwnerId: jest.fn((id: string, user: ICurrentUser) => {
    return { id };
  }),
  create: jest.fn((pet: CreatePetDto & { ownerId: ObjectId }) => {
    return { ...pet, id: new NativeObjectId(1) };
  }),
  update: jest.fn((id: string, updatePetDto: UpdatePetDto) => {
    const pet = {
      id,
      dateOfBirth: new Date(2010, 4, 6),
      name: 'Morgan',
      breed: 'Layka',
    };

    pet.name = updatePetDto.name || pet.name;
    pet.dateOfBirth = updatePetDto.dateOfBirth || pet.dateOfBirth;
    pet.breed = updatePetDto.breed || pet.breed;

    return pet;
  }),
  getById: jest.fn(),
  getAllByOwnerId: jest.fn(),
};

export const errorLogsRepositoryMock = {
  saveLog: jest.fn(),
};

export const usersRepositoryMock = {
  create: jest.fn((createUserDto: CreateUserDto) => {
    type UserType = IUserWithHashedPassword & { id: string };

    const users: UserType[] = [
      {
        id: '1',
        firstName: 'Kolya',
        lastName: 'Genosi',
        login: 'existing-login',
        passwordHash: 'asfjnjfansdsa',
      },
    ];

    const loginExists =
      users.findIndex((user) => user.login === createUserDto.login) !== -1;

    if (loginExists) throw { code: 11000 };

    return { id: '1212312', ...createUserDto };
  }),
  update: jest.fn((id: string, updateUserDto: UpdateUserDto) => {
    type UserType = IUserWithHashedPassword & { id: string };

    const users: UserType[] = [
      {
        id: '1',
        firstName: 'Kolya',
        lastName: 'Genosi',
        login: 'existing-login',
        passwordHash: 'asfjnjfansdsa',
      },
    ];

    const loginExists =
      users.findIndex((user) => user.login === updateUserDto.login) !== -1;

    if (loginExists) throw { code: 11000 };

    const targetUser = users.find((user) => user.id === id);

    if (!targetUser) return null;

    return { ...targetUser, ...updateUserDto };
  }),
  getById: jest.fn((id: string) => {
    const user: Omit<User, 'pets'> & { id: string } = {
      id,
      firstName: 'Pavel',
      lastName: 'Stankevich',
      login: 'pavelStankevich',
      passwordHash: 'dasfkangeropgoerno3i4ngoi3nobjernlfsnjegnerj',
    };

    return { ...user, toObject: () => user };
  }),
  getByIdWithPets: jest.fn(),
  getByLogin: jest.fn(),
  addPet: jest.fn(),
  removePet: jest.fn(),
};

export const usersServiceMock = {
  findOneById: jest.fn((id: string) => {
    const user: Omit<Omit<User, 'pets'>, 'passwordHash'> & { id: string } = {
      id,
      firstName: 'Pavel',
      lastName: 'Stankevich',
      login: 'pavelStankevich',
    };

    return user;
  }),
};

export const jwtServiceMock = {
  signAsync: jest.fn((user: ICurrentUser) => {
    return 'token-random-afjw-sdgsdgsd.fsdgasdfasgasdg.adfasdgasdgsdgas';
  }),
  decode: jest.fn((token: string) => {
    return {
      exp: Date.now() + Date.now(),
      login: 'logn',
      id: '12423',
    };
  }),
};

export const jwtBlacklistServiceMock = {};
