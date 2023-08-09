import { IsDateString, IsString, Length } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsString()
  @Length(2, 50)
  breed: string;
}
