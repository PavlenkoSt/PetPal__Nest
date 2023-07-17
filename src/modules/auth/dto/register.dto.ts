import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @IsString()
  @Length(4, 50)
  name: string;

  @IsNumber()
  @Min(10)
  @Max(120)
  age: number;
}
