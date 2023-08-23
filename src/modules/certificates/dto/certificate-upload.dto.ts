import { ApiProperty } from '@nestjs/swagger';

export class CertificateUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  certificate: any;
}
