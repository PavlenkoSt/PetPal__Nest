import { Injectable } from '@nestjs/common';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';

@Injectable()
export class VaccinationsService {
  create(createVaccinationDto: CreateVaccinationDto) {
    return 'This action adds a new vaccination';
  }

  findAll() {
    return `This action returns all vaccinations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccination`;
  }

  update(id: number, updateVaccinationDto: UpdateVaccinationDto) {
    return `This action updates a #${id} vaccination`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccination`;
  }
}
