import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  pageLength?: number;

  @IsOptional()
  @IsNumber()
  pageNumber?: number;
}
