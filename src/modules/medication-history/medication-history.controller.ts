import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MedicationHistoryService } from './medication-history.service';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { PetsResponses } from './medication-history.responses';

@ApiBearerAuth()
@ApiTags('medication-history')
@Controller('medication-history')
export class MedicationHistoryController {
  constructor(
    private readonly medicationHistoryService: MedicationHistoryService,
  ) {}

  @Get('forAllPets')
  @ApiOperation({
    summary: 'Get medication-history for all user pets',
  })
  @PetsResponses.history
  getForAllPetsInCurrentUser(@User() currentUser: ICurrentUser) {
    return this.medicationHistoryService.findForAllPets(String(currentUser.id));
  }

  @Get(':petId')
  @ApiOperation({
    summary: 'Get medication-history for specific pet',
  })
  @PetsResponses.histories
  getByPetId(@Param('petId', IdValidationPipe) petId: string) {
    return this.medicationHistoryService.findByPetId(petId);
  }
}
