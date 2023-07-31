import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @User() user: ICurrentUser) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  findAll(@User() user: ICurrentUser) {
    return this.petsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: ICurrentUser) {
    return this.petsService.remove(id, user);
  }
}
