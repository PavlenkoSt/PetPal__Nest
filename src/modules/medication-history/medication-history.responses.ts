import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { IPetResponse, petInResponse } from '../pets/pets.responses';
import {
  IAllergyResponse,
  allergyInResponse,
} from '../allergies/allergies.responses';
import {
  IVaccinationInResponse,
  vaccinationInResponse,
} from '../vaccinations/vaccinations.responses';
import {
  IVetVisitResponse,
  vetVisitInResponse,
} from '../vet-visit/vet-visit.responses';

export interface IMedicationHistoryResponse extends IPetResponse {
  allergies: IAllergyResponse[];
  vaccinations: IVaccinationInResponse[];
  'vet-visited': IVetVisitResponse[];
}

export const historyInResponse: IMedicationHistoryResponse = {
  ...petInResponse,
  allergies: [allergyInResponse],
  vaccinations: [vaccinationInResponse],
  'vet-visited': [vetVisitInResponse],
};

export const PetsResponses = {
  history: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: historyInResponse,
    },
  }),
  histories: ApiResponse({
    status: HttpStatusCode.Ok,
    schema: {
      example: [historyInResponse],
    },
  }),
};
