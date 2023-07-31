import { IsString, Length } from 'class-validator';

export class CreateUserDto {
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
}
