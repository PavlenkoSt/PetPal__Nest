import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateAllergyDto } from './dto/create-allergy.dto';

export interface IAllergyResponse extends CreateAllergyDto {
  _id: string;
}

export const allergyInResponse: IAllergyResponse = {
  _id: 'string',
  name: 'string',
  description: 'string',
  petId: 'string',
};

export const AllergiesResponses = {
  allergyCreated: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: allergyInResponse,
    },
  }),
  allergy: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: allergyInResponse,
    },
  }),
  allergies: ApiOkResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [allergyInResponse],
    },
  }),
};
