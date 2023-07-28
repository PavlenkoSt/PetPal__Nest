import { PartialType } from '@nestjs/mapped-types';
import { CreatePetsHealthDto } from './create-pets-health.dto';

export class UpdatePetsHealthDto extends PartialType(CreatePetsHealthDto) {}
