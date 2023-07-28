import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsHealthService } from './pets-health.service';
import { CreatePetsHealthDto } from './dto/create-pets-health.dto';
import { UpdatePetsHealthDto } from './dto/update-pets-health.dto';

@Controller('pets-health')
export class PetsHealthController {
  constructor(private readonly petsHealthService: PetsHealthService) {}

  @Post()
  create(@Body() createPetsHealthDto: CreatePetsHealthDto) {
    return this.petsHealthService.create(createPetsHealthDto);
  }

  @Get()
  findAll() {
    return this.petsHealthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsHealthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetsHealthDto: UpdatePetsHealthDto) {
    return this.petsHealthService.update(+id, updatePetsHealthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsHealthService.remove(+id);
  }
}
