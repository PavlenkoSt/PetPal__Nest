import { Injectable } from '@nestjs/common';

import { MedicationHistoryRepository } from './medication-history.repository';

@Injectable()
export class MedicationHistoryService {
  constructor(
    private readonly medicationHistoryRepository: MedicationHistoryRepository,
  ) {}

  findForAllPets(userId: string) {
    return this.medicationHistoryRepository.findForAllPets(userId);
  }

  findByPetId(petId: string) {
    return this.medicationHistoryRepository.findByPetId(petId);
  }
}
