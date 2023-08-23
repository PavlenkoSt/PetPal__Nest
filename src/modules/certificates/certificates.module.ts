import { Module } from '@nestjs/common';

import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { S3FilesService } from 'src/aws/s3-files.service';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService, S3FilesService],
})
export class CertificatesModule {}
