import { IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsString()
  @Length(6, 50)
  login: string;

  @IsString()
  id: string;
}
