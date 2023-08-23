import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { S3FilesService } from 'src/aws/s3-files.service';
import { Certificate, CertificateSchema } from './schemas/certificate.schema';
import { CertificatesRepository } from './certificates.repository';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    PetsModule,
    MongooseModule.forFeature([
      {
        name: Certificate.name,
        schema: CertificateSchema,
      },
    ]),
  ],
  controllers: [CertificatesController],
  providers: [CertificatesService, CertificatesRepository, S3FilesService],
})
export class CertificatesModule {}
