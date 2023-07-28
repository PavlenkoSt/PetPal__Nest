import { Injectable } from '@nestjs/common';
import { CreatePetsMediaDto } from './dto/create-pets-media.dto';
import { UpdatePetsMediaDto } from './dto/update-pets-media.dto';

@Injectable()
export class PetsMediaService {
  create(createPetsMediaDto: CreatePetsMediaDto) {
    return 'This action adds a new petsMedia';
  }

  findAll() {
    return `This action returns all petsMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petsMedia`;
  }

  update(id: number, updatePetsMediaDto: UpdatePetsMediaDto) {
    return `This action updates a #${id} petsMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} petsMedia`;
  }
}
