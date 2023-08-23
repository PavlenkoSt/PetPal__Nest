import { Injectable } from '@nestjs/common';

import { S3FilesService } from 'src/aws/s3-files.service';

@Injectable()
export class CertificatesService {
  constructor(private readonly s3FilesService: S3FilesService) {}

  async upload(file: Express.Multer.File) {
    const { originalname, buffer } = file;

    const uploaded = await this.s3FilesService.uploadFile(originalname, buffer);
  }
}
