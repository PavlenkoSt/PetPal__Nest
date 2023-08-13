import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @Length(5, 50)
  @ApiProperty()
  name: string;

  @IsString()
  @Length(5, 140)
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  petId: string;
}
