import { IsDate, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @Length(6, 50)
  login: string;

  @IsString()
  @Length(6, 50)
  password: string;

  @IsString()
  @Length(4, 50)
  firstName: string;

  @IsString()
  @Length(4, 50)
  lastName: string;

  @IsDate()
  dateOfBirth: Date;
}
