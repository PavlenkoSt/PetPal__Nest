import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsMediaService } from './pets-media.service';
import { CreatePetsMediaDto } from './dto/create-pets-media.dto';
import { UpdatePetsMediaDto } from './dto/update-pets-media.dto';

@Controller('pets-media')
export class PetsMediaController {
  constructor(private readonly petsMediaService: PetsMediaService) {}

  @Post()
  create(@Body() createPetsMediaDto: CreatePetsMediaDto) {
    return this.petsMediaService.create(createPetsMediaDto);
  }

  @Get()
  findAll() {
    return this.petsMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsMediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetsMediaDto: UpdatePetsMediaDto) {
    return this.petsMediaService.update(+id, updatePetsMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsMediaService.remove(+id);
  }
}
