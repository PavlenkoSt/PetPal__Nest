import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Vaccination } from './schemas/vaccination.schema';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';

export class VaccinationsRepository {
  constructor(
    @InjectModel(Vaccination.name) private vaccinationModel: Model<Vaccination>,
  ) {}

  getAllByPetId(petId: string) {
    return this.vaccinationModel.find({ petId }, { petId: false });
  }

  getOneById(id: string) {
    return this.vaccinationModel.findById(id);
  }

  create(createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationModel.create(createVaccinationDto);
  }

  update(id: string, updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationModel.findOneAndUpdate(
      { id },
      updateVaccinationDto,
      {
        new: true,
      },
    );
  }

  deleteAllByPetId(petId: string) {
    return this.vaccinationModel.deleteMany({ petId });
  }

  delete(id: string) {
    return this.vaccinationModel.findByIdAndDelete(id);
  }
}
