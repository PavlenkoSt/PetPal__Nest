import { IsDateString, IsString, Length, isString } from 'class-validator';

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
