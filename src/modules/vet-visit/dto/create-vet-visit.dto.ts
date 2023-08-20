import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateVetVisitDto {
  @ApiProperty()
  @IsDateString()
  dateTime: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 50)
  description?: string;

  @ApiProperty()
  @IsString()
  clinicName: string;

  @ApiProperty()
  @IsMongoId()
  petId: string;
}
