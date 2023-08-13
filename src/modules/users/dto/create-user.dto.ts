import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 50)
  @ApiProperty()
  login: string;

  @IsString()
  @Length(6, 50)
  @ApiProperty()
  password: string;

  @IsString()
  @Length(4, 50)
  @ApiProperty()
  firstName: string;

  @IsString()
  @Length(4, 50)
  @ApiProperty()
  lastName: string;
}
