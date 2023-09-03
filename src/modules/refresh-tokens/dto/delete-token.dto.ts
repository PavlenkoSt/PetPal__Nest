import { IsDateString, IsString } from 'class-validator';

export class DeleteTokenDto {
  @IsString()
  token: string;

  @IsString()
  userId: string;
}
