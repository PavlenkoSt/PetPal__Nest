import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { UpdateVetVisitDto } from './dto/update-vet-visit.dto';
import { VetVisitRepository } from './vet-visit.repository';
import { IVetVisitWithUserId } from './interfaces/IVetVisitWithUserId';
import { VetVisitStatusQueryEnum } from './interfaces/VetVisitStatusQueryEnum';
import { VetVisit } from './schemas/vet-visit.schema';
import { statusQueryParserUtil } from './util/status.query-parser.util';

@Injectable()
export class VetVisitService {
  constructor(private readonly vetVisitRepository: VetVisitRepository) {}

  create(vetVisitDetails: IVetVisitWithUserId) {
    return this.vetVisitRepository.create(vetVisitDetails);
  }

  getAllByPetId(petId: string, status: VetVisitStatusQueryEnum) {
    return this.vetVisitRepository.getAllVisitsByPetId(
      petId,
      statusQueryParserUtil(status),
    );
  }

  getAllByUserId(userId: string, status: VetVisitStatusQueryEnum) {
    return this.vetVisitRepository.getAllVisitsByUserId(
      userId,
      statusQueryParserUtil(status),
    );
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
