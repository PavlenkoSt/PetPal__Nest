import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateErrorLogDto {
  @IsDateString()
  dateTime: string;

  @IsString()
  message: string;

  @IsNumber()
  statusCode: number;

  @IsString()
  path: string;

  @IsString()
  method: string;

  @IsString()
  stack: string;

  @IsString()
  body: string;
}
