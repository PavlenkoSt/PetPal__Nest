import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: Omit<CreateUserDto, 'password'> & { passwordHash: string }) {
    return this.userModel.create(user);
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
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
}
