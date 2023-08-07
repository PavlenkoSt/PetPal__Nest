import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserWithHashedPassword } from './interfaces/IUserWithHashedPassword';

export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: IUserWithHashedPassword) {
    return this.userModel.create(user);
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto);
  }

  getById(id: string) {
    return this.userModel.findById(id);
  }

  getByIdWithPets(id: string) {
    return this.userModel
      .findById(new ObjectId(id), { passwordHash: false })
      .populate('pets', {
        ownerId: false,
      });
  }

  getByLogin(login: string) {
    return this.userModel.findOne({ login });
  }

  addPet(userId: string, petId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      $push: {
        pets: petId,
      },
    });
  }

  removePet(userId: string, petId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      $pull: {
        pets: petId,
      },
    });
  }
}
