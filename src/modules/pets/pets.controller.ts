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

import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { PetsResponses } from './pets.responses';

@Controller('pets')
@ApiTags('pets')
@ApiBearerAuth()
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create pet' })
  @PetsResponses.petCreated
  create(@Body() createPetDto: CreatePetDto, @User() user: ICurrentUser) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all current user pets' })
  @PetsResponses.pets
  findAll(@User() user: ICurrentUser) {
    return this.petsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pet by id' })
  @PetsResponses.pet
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pet' })
  @PetsResponses.pet
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pet' })
  remove(@Param('id') id: string, @User() user: ICurrentUser) {
    return this.petsService.remove(id, user);
  }
}
