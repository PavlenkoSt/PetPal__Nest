import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateVetVisitDto } from './create-vet-visit.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVetVisitDto extends PartialType(CreateVetVisitDto) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
