import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateVetVisitDto } from './dto/create-vet-visit.dto';

type IVetVisit = CreateVetVisitDto & { _id: string; isDone: boolean };

const vetVisit: IVetVisit = {
  _id: 'string',
  dateTime: '2023-05-15T20:20:20',
  clinicName: 'VetCl',
  isDone: false,
  petId: 'string',
  description: 'string',
};

export const VetVisitResponses = {
  vetVisitCreated: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: vetVisit,
    },
  }),
  vetVisit: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: vetVisit,
    },
  }),
  vetVisits: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [vetVisit],
    },
  }),
};
