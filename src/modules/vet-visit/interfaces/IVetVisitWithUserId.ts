import { CreateVetVisitDto } from '../dto/create-vet-visit.dto';

export interface IVetVisitWithUserId extends CreateVetVisitDto {
  userId: string;
}
