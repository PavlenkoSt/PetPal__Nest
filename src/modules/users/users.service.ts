import { Injectable, NotFoundException } from '@nestjs/common';

import { ConflictException } from 'src/exceptions/conflict.exception';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { hashPassword } from '../auth/util/password-hash.util';
import { mongoParseObject } from 'src/db/mongo-parse-object.util';
import { UserDocument } from './schemas/user.schema';
import { LOGIN_ALREADY_EXITS, USER_NOT_FOUND } from './users.constants';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findOneByLogin(login: string) {
    return this.usersRepository.getByLogin(login);
  }

  async getById(id: string) {
    const user = await this.usersRepository.getByIdWithPets(id);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.getById(id);

    const { passwordHash, ...rest } = mongoParseObject(user);

    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { password, ...rest } = createUserDto;

    const passwordHash = await hashPassword(password);

    try {
      return await this.usersRepository.create({ ...rest, passwordHash });
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(LOGIN_ALREADY_EXITS);
      }

      throw e;
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const passwordHash = await hashPassword(updateUserDto.password);

      updateUserDto.password = passwordHash;
    }

    try {
      return await this.usersRepository.update(userId, updateUserDto);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(LOGIN_ALREADY_EXITS);
      }

      throw e;
    }
  }
}
