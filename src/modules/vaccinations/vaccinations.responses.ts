import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { VACCINATION_NOT_FOUND } from './vaccinations.constants';

export interface IVaccinationInResponse extends CreateVaccinationDto {
  _id: string;
}

export const vaccinationInResponse: IVaccinationInResponse = {
  _id: 'string',
  date: '2023-05-15T20:20:20',
  description: 'string',
  name: 'string',
  petId: 'string',
};

export const VaccinationsResponses = {
  vaccination: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: vaccinationInResponse,
    },
  }),
  vaccinations: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [vaccinationInResponse],
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
