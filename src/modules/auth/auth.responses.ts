import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

export const AuthResponses = {
  login: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: {
        access_token: 'string',
      },
    },
  }),
};
