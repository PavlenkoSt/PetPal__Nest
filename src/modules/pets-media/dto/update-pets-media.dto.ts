import { PartialType } from '@nestjs/mapped-types';
import { CreatePetsMediaDto } from './create-pets-media.dto';

export class UpdatePetsMediaDto extends PartialType(CreatePetsMediaDto) {}
