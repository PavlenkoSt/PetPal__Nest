import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVetVisitDto {
  @ApiProperty()
  @IsDateString()
  dateTime: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  description?: string;

  @ApiProperty()
  @IsString()
  clinicName: string;

  @ApiProperty()
  @IsMongoId()
  petId: string;
}
