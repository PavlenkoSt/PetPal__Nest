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

import { AllergiesService } from './allergies.service';

import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { AllergiesResponses } from './allergies.responses';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('allergies')
@ApiTags('allergies')
@ApiBearerAuth()
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create allergy for pet' })
  @AllergiesResponses.allergyCreated
  create(@Body() createAllergyDto: CreateAllergyDto) {
    return this.allergiesService.create(createAllergyDto);
  }

  @Get('byPetId/:petId')
  @AllergiesResponses.allergies
  @ApiOperation({ summary: 'Get all allergies by pet id' })
  findAll(@Param('petId', IdValidationPipe) id: string) {
    return this.allergiesService.findAll(id);
  }

  @Get(':id')
  @AllergiesResponses.allergy
  @ApiOperation({ summary: 'Get allergy by id' })
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.allergiesService.findOne(id);
  }

  @Patch(':id')
  @AllergiesResponses.allergy
  @ApiOperation({ summary: 'Update allergy' })
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateAllergyDto: UpdateAllergyDto,
  ) {
    return this.allergiesService.update(id, updateAllergyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete allergy' })
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.allergiesService.delete(id);
  }
}
