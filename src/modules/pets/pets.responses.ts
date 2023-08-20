import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreatePetDto } from './dto/create-pet.dto';

export interface IPetResponse extends CreatePetDto {
  _id: string;
}

export const petInResponse: IPetResponse = {
  _id: 'string',
  name: 'string',
  dateOfBirth: '2023-05-15T20:20:20',
  breed: 'string',
};

export const PetsResponses = {
  petCreated: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: petInResponse,
    },
  }),
  pet: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: petInResponse,
    },
  }),
  pets: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [petInResponse],
    },
  }),
};
