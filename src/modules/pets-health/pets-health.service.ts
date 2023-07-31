import { Injectable } from '@nestjs/common';
import { CreatePetsHealthDto } from './dto/create-pets-health.dto';
import { UpdatePetsHealthDto } from './dto/update-pets-health.dto';

@Injectable()
export class PetsHealthService {
  constructor() {}

  create(createPetsHealthDto: CreatePetsHealthDto) {
    return 'This action adds a new petsHealth';
  }

  findAll() {
    return `This action returns all petsHealth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petsHealth`;
  }

  update(id: number, updatePetsHealthDto: UpdatePetsHealthDto) {
    return `This action updates a #${id} petsHealth`;
  }

  remove(id: number) {
    return `This action removes a #${id} petsHealth`;
  }
}
