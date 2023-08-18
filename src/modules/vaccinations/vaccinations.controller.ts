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

import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { VaccinationsResponses } from './vaccinations.responses';

@ApiTags('vaccinations')
@ApiBearerAuth()
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create vaccination' })
  @VaccinationsResponses.vaccination
  create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Get('byPetId/:petId')
  @VaccinationsResponses.vaccinations
  @ApiOperation({ summary: 'Get vaccination by pet id' })
  findAll(@Param('petId') petId: string) {
    return this.vaccinationsService.findAllByPetId(petId);
  }

  @Get(':id')
  @VaccinationsResponses.vaccination
  @VaccinationsResponses.vaccinationNotFound
  @ApiOperation({ summary: 'Get vaccination by id' })
  findOne(@Param('id') id: string) {
    return this.vaccinationsService.findOne(id);
  }

  @Patch(':id')
  @VaccinationsResponses.vaccination
  @VaccinationsResponses.vaccinationNotFound
  @ApiOperation({ summary: 'Update vaccination' })
  update(
    @Param('id') id: string,
    @Body() updateVaccinationDto: UpdateVaccinationDto,
  ) {
    return this.vaccinationsService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @VaccinationsResponses.noContent
  @VaccinationsResponses.vaccinationNotFound
  delete(@Param('id') id: string) {
    return this.vaccinationsService.delete(id);
  }
}
