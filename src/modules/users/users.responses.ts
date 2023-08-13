import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

const user = {
  id: 'string',
  login: 'string',
  firstName: 'string',
  lastName: 'string',
};

export const UsersResponses = {
  userWithPets: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: { ...user, pets: [] },
    },
  }),
};
