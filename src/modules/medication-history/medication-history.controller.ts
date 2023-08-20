import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MedicationHistoryService } from './medication-history.service';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@ApiBearerAuth()
@ApiTags('medication-history')
@Controller('medication-history')
export class MedicationHistoryController {
  constructor(
    private readonly medicationHistoryService: MedicationHistoryService,
  ) {}

  @Get('forAllPets')
  getForAllPetsInCurrentUser(@User() currentUser: ICurrentUser) {
    return this.medicationHistoryService.findForAllPets(String(currentUser.id));
  }

  @Get(':petId')
  getByPetId(@Param('petId', IdValidationPipe) petId: string) {
    return this.medicationHistoryService.findByPetId(petId);
  }
}
