import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ScheduledVetVisit } from './schemas/scheduled-vet-visit.schema';
import { CreateScheduledVetVisitDto } from './dto/create-scheduled-vet-visit.dto';
import { UpdateScheduledVetVisitDto } from './dto/update-scheduled-vet-visit.dto';

export class ScheduledVetVisitRepository {
  constructor(
    @InjectModel(ScheduledVetVisit.name)
    private scheduledVetVisitModel: Model<ScheduledVetVisit>,
  ) {}

  getVisitById(id: string) {
    return this.scheduledVetVisitModel.findById(id);
  }

  getAllVisitsByPetId(petId: string) {
    return this.scheduledVetVisitModel.find({ petId });
  }

  getAllVisitsByUserId(userId: string) {
    return this.scheduledVetVisitModel.find({ userId });
  }

  create(
    createVisitDto: CreateScheduledVetVisitDto & {
      userId: string;
    },
  ) {
    return this.scheduledVetVisitModel.create(createVisitDto);
  }

  update(id: string, updateVisitDto: UpdateScheduledVetVisitDto) {
    return this.scheduledVetVisitModel.findByIdAndUpdate(id, updateVisitDto);
  }

  delete(id: string) {
    return this.scheduledVetVisitModel.findByIdAndDelete(id);
  }
}
