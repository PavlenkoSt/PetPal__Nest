import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';

import { IConfigService } from 'src/config/configuration';
import { connectToS3 } from './s3';

@Injectable()
export class S3FilesService {
  private s3: S3;

  constructor(private configService: ConfigService<IConfigService>) {
    this.s3 = connectToS3(configService);
  }

  async uploadFile(filename: string, buffer: Buffer) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_S3_SETIFICATES_BUCKET'),
        Body: buffer,
        Key: `${v4()}-${filename}`,
      })
      .promise();

    return uploadResult;
  }
}
