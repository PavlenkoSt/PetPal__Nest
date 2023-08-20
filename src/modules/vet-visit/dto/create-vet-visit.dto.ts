import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateVetVisitDto {
  @IsDateString()
  dateTime: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  description?: string;

  @IsString()
  clinicName: string;

  @IsMongoId()
  petId: string;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
