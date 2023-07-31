import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './schemas/pet.schema';
import { ICurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/schemas/user.schema';
import { PET_NOT_FOUND } from './pets.constants';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createPetDto: CreatePetDto, currentUser: ICurrentUser) {
    const created = await this.petModel.create({
      ...createPetDto,
      ownerId: currentUser.id,
    });

    await this.userModel.findByIdAndUpdate(currentUser.id, {
      $push: {
        pets: created.id,
      },
    });

    return created;
  }

  async findAll(currentUser: ICurrentUser) {
    return await this.petModel.find(
      { ownerId: currentUser.id },
      { ownerId: false },
    );
  }

  async findOne(id: string) {
    return await this.petModel.findById(id);
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    return await this.petModel.findByIdAndUpdate(id, updatePetDto, {
      new: true,
    });
  }

  async remove(id: string, user: ICurrentUser) {
    const res = await this.petModel.findOneAndDelete({
      ownerId: user.id,
      _id: id,
    });

    if (!res) {
      throw new NotFoundException({
        message: PET_NOT_FOUND,
      });
    } else {
      await this.userModel.findByIdAndUpdate(user.id, {
        $pull: {
          pets: id,
        },
      });
    }

    return res;
  }
}
