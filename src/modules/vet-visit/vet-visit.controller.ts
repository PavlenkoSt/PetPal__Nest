import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { VetVisitService } from './vet-visit.service';
import { CreateVetVisitDto } from './dto/create-vet-visit.dto';
import { UpdateVetVisitDto } from './dto/update-vet-visit.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('vet-visit')
export class VetVisitController {
  constructor(private readonly vetVisitService: VetVisitService) {}

  @Post()
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
  getAllByPetId(@Param('petId', IdValidationPipe) petId: string) {
    return this.vetVisitService.getAllByPetId(petId);
  }

  @Get('byUserId/:userId')
  getAllByUserId(@Param('userId', IdValidationPipe) userId: string) {
    return this.vetVisitService.getAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.vetVisitService.getOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateVetVisitDto: UpdateVetVisitDto,
  ) {
    return this.vetVisitService.update(id, updateVetVisitDto);
  }

  @Delete(':id')
  delete(@Param('id', IdValidationPipe) id: string) {
    return this.vetVisitService.delete(id);
  }
}
