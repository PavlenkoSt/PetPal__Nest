import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

import { IConfigService } from '../config/configuration';
import { connectToS3 } from './s3';

@Injectable()
export class S3LoggerService {
  private s3: S3;

  constructor(private configService: ConfigService<IConfigService>) {
    this.s3 = connectToS3(configService);
  }

  async saveLogToS3(key: string, data: string): Promise<void> {
    const Bucket = this.configService.get('AWS_S3_ERRORS_BUCKET', {
      infer: true,
    });

    if (!Bucket) throw new Error('Bucket name not provided');

    const params = {
      Bucket,
      Key: key,
      Body: data,
    };

    let existingData = null;

    try {
      existingData = await this.s3.getObject({ Bucket, Key: key }).promise();
    } catch (e) {}

    const existingLogContent = existingData?.Body?.toString() || '';
    const updatedLogContent = existingLogContent + '\n\n' + data;

    await this.s3.putObject({ ...params, Body: updatedLogContent }).promise();
  }
}
