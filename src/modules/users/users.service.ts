import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConflictException } from 'src/exceptions/conflict.exception';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../auth/util/password-hash.util';
import { User, UserDocument } from './schemas/user.schema';
import { LOGIN_ALREADY_EXITS } from './users.constants';
import { mongoParseObject } from 'src/db/mongo-parse-object.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByLogin(login: string) {
    return await this.userModel.findOne({ login });
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id);

    const { passwordHash, ...rest } = mongoParseObject(user);

    return rest;
  }

  async getProfile(id: string) {
    const profile = await this.userModel
      .findById(new ObjectId(id), { passwordHash: false })
      .populate('pets', {
        ownerId: false,
      });

    return profile;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { password, ...rest } = createUserDto;

    const passwordHash = await hashPassword(password);

    try {
      return await this.userModel.create({ ...rest, passwordHash });
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(LOGIN_ALREADY_EXITS);
      }

      throw e;
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const passwordHash = await hashPassword(updateUserDto.password);

      updateUserDto.password = passwordHash;
    }

    try {
      return await this.userModel.findByIdAndUpdate(userId, updateUserDto);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(LOGIN_ALREADY_EXITS);
      }

      throw e;
    }
  }
}
