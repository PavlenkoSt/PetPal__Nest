import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

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

  getAllVisitsByPetId(petId: string, query: FilterQuery<VetVisit>) {
    return this.vetVisitModel.find({ petId, ...query });
  }

  getAllVisitsByUserId(userId: string, query: FilterQuery<VetVisit>) {
    return this.vetVisitModel.find({ userId, ...query }).populate('pet', {
      ownerId: false,
    });
  }

  create(visitDetails: IVetVisitWithUserId) {
    return this.vetVisitModel.create(visitDetails);
  }

  update(id: string, updateVisitDto: UpdateVetVisitDto) {
    return this.vetVisitModel.findByIdAndUpdate(id, updateVisitDto, {
      new: true,
    });
  }

  delete(id: string) {
    return this.vetVisitModel.findByIdAndDelete(id);
  }

  deleteAllByPetId(petId: string) {
    return this.vetVisitModel.deleteMany({ petId });
  }
}
