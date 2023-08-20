import { PartialType } from '@nestjs/swagger';
import { CreateScheduledVetVisitDto } from './create-scheduled-vet-visit.dto';

export class UpdateScheduledVetVisitDto extends PartialType(CreateScheduledVetVisitDto) {}
