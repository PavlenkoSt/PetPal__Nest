import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

import { ConfigurationEnum } from '../config/configuration';

@Injectable()
export class S3LoggerService {
  private s3: S3;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>(ConfigurationEnum.AWS_REGION);
    const accessKeyId = this.configService.get<string>(
      ConfigurationEnum.AWS_ACCESS_KEY_ID,
    );
    const secretAccessKey = this.configService.get<string>(
      ConfigurationEnum.AWS_SECRET_ACCESS_KEY,
    );

    if (!accessKeyId || !secretAccessKey)
      throw new Error('AWS S3 connection failed');

    this.s3 = new S3({ region, credentials: { accessKeyId, secretAccessKey } });
  }

  async saveLogToS3(key: string, data: string): Promise<void> {
    const Bucket = this.configService.get<string>(
      ConfigurationEnum.AWS_S3_ERRORS_BUCKET,
    );

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
