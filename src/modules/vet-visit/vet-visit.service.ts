import { Injectable } from '@nestjs/common';

import { UpdateVetVisitDto } from './dto/update-vet-visit.dto';
import { VetVisitRepository } from './vet-visit.repository';
import { IVetVisitWithUserId } from './interfaces/IVetVisitWithUserId';

@Injectable()
export class VetVisitService {
  constructor(private readonly vetVisitRepository: VetVisitRepository) {}

  create(vetVisitDetails: IVetVisitWithUserId) {
    return this.vetVisitRepository.create(vetVisitDetails);
  }

  getAllByPetId(petId: string) {
    return this.vetVisitRepository.getAllVisitsByPetId(petId);
  }

  getAllByUserId(userId: string) {
    return this.vetVisitRepository.getAllVisitsByUserId(userId);
  }

  getOneById(id: string) {
    return this.vetVisitRepository.getVisitById(id);
  }

  update(id: string, updateVetVisitDto: UpdateVetVisitDto) {
    return this.vetVisitRepository.update(id, updateVetVisitDto);
  }

  delete(id: string) {
    return this.vetVisitRepository.delete(id);
  }
}
