import { IsString, Length } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @Length(5, 50)
  name: string;

  @IsString()
  @Length(5, 140)
  description: string;

  @IsString()
  petId: string;
}
