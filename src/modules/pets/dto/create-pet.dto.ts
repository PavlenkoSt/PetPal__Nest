import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Length } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @Length(2, 50)
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: string;

  @IsString()
  @Length(2, 50)
  @ApiProperty()
  breed: string;
}
