import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VetVisit } from './schemas/vet-visit.schema';
import { UpdateVetVisitDto } from './dto/update-vet-visit.dto';
import { IVetVisitWithUserId } from './interfaces/IVetVisitWithUserId';

export class VetVisitRepository {
  constructor(
    @InjectModel(VetVisit.name)
    private vetVisitModel: Model<VetVisit>,
  ) {}

  getVisitById(id: string) {
    return this.vetVisitModel.findById(id);
  }

  getAllVisitsByPetId(petId: string) {
    return this.vetVisitModel.find({ petId });
  }

  getAllVisitsByUserId(userId: string) {
    return this.vetVisitModel.find({ userId }).populate('pet', {
      ownerId: false,
    });
  }

  create(visitDetails: IVetVisitWithUserId) {
    return this.vetVisitModel.create(visitDetails);
  }

  update(id: string, updateVisitDto: UpdateVetVisitDto) {
    return this.vetVisitModel.findByIdAndUpdate(id, updateVisitDto);
  }

  delete(id: string) {
    return this.vetVisitModel.findByIdAndDelete(id);
  }

  deleteAllByPetId(petId: string) {
    return this.vetVisitModel.deleteMany({ petId });
  }
}
