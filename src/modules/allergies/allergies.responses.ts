import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

const allergy = {
  id: 'string',
  name: 'string',
  description: 'string',
  petId: 'string',
};

export const AllergiesResponses = {
  allergyCreated: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: allergy,
    },
  }),
  allergy: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: allergy,
    },
  }),
  allergies: ApiOkResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [allergy],
    },
  }),
};
