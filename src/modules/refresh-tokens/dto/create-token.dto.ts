import { IsDateString, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  token: string;

  @IsString()
  userId: string;

  @IsDateString()
  expiresAt: Date;
}
