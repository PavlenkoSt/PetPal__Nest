import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { IVetVisitWithIsDone } from './interfaces/IVetVisitWithIsDone';

export interface IVetVisitResponse extends IVetVisitWithIsDone {
  _id: string;
}

export const vetVisitInResponse: IVetVisitResponse = {
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
      example: vetVisitInResponse,
    },
  }),
  vetVisit: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: vetVisitInResponse,
    },
  }),
  vetVisits: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [vetVisitInResponse],
    },
  }),
};
