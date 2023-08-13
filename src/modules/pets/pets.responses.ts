import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

const pet = {
  id: 'string',
  name: 'string',
  dateOfBirth: '2023-05-15T20:20:20',
  breed: 'string',
};

export const PetsResponses = {
  petCreated: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: pet,
    },
  }),
  pet: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: pet,
    },
  }),
  pets: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [pet],
    },
  }),
};
