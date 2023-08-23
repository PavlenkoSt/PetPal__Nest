import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

export interface ICertificateResponse {
  _id: string;
  key: string;
  petId: string;
  uploadedAt: string;
}

export const certificatesResponse: ICertificateResponse = {
  _id: 'string',
  key: 'string',
  petId: 'string',
  uploadedAt: 'string',
};

export const CertificatesResponses = {
  certificateCreated: ApiResponse({
    status: HttpStatusCode.Created,
    schema: {
      example: certificatesResponse,
    },
  }),
};
