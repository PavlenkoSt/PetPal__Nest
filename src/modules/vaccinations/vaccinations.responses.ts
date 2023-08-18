import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { VACCINATION_NOT_FOUND } from './vaccinations.constants';

type IVaccinationInResponse = CreateVaccinationDto & { id: string };

const vaccination: IVaccinationInResponse = {
  id: 'string',
  date: '2023-05-15T20:20:20',
  description: 'string',
  name: 'string',
  petId: 'string',
};

export const VaccinationsResponses = {
  vaccination: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: vaccination,
    },
  }),
  vaccinations: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [vaccination, vaccination],
    },
  }),
  vaccinationNotFound: ApiResponse({
    status: HttpStatusCode.NotFound,
    schema: {
      example: {
        statusCode: HttpStatusCode.NotFound,
        message: VACCINATION_NOT_FOUND,
      },
    },
  }),
  noContent: ApiResponse({
    status: HttpStatusCode.NoContent,
  }),
};
