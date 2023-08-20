import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { VetVisitService } from './vet-visit.service';
import { CreateVetVisitDto } from './dto/create-vet-visit.dto';
import { UpdateVetVisitDto } from './dto/update-vet-visit.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { VetVisitResponses } from './vet-visit.responses';

@ApiBearerAuth()
@ApiTags('vet-visit')
@Controller('vet-visit')
export class VetVisitController {
  constructor(private readonly vetVisitService: VetVisitService) {}

  @Post()
  @VetVisitResponses.vetVisitCreated
  @ApiOperation({ summary: 'Create vet visit' })
  create(
    @User() currentUser: ICurrentUser,
    @Body() createVetVisitDto: CreateVetVisitDto,
  ) {
    return this.vetVisitService.create({
      ...createVetVisitDto,
      userId: String(currentUser.id),
    });
  }

  @Get('byPetId/:petId')
  @VetVisitResponses.vetVisits
  @ApiOperation({ summary: 'Get all vet visits by pet id' })
  getAllByPetId(@Param('petId', IdValidationPipe) petId: string) {
    return this.vetVisitService.getAllByPetId(petId);
  }

  @Get('allForCurrentUser')
  @VetVisitResponses.vetVisits
  @ApiOperation({ summary: 'Get all vet visits by user id' })
  getAllByUserId(@User() currentUser: ICurrentUser) {
    return this.vetVisitService.getAllByUserId(String(currentUser.id));
  }

  @Get(':id')
  @VetVisitResponses.vetVisit
  @ApiOperation({ summary: 'Get vet visits by id' })
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.vetVisitService.getOneById(id);
  }

  @Patch(':id')
  @VetVisitResponses.vetVisit
  @ApiOperation({ summary: 'Update vet visit' })
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateVetVisitDto: UpdateVetVisitDto,
  ) {
    return this.vetVisitService.update(id, updateVetVisitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vet visit' })
  delete(@Param('id', IdValidationPipe) id: string) {
    return this.vetVisitService.delete(id);
  }
}
