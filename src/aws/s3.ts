import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { IConfigService } from 'src/config/configuration';

export const connectToS3 = (configService: ConfigService<IConfigService>) => {
  const region = configService.get('AWS_REGION', { infer: true });
  const accessKeyId = configService.get('AWS_ACCESS_KEY_ID', {
    infer: true,
  });
  const secretAccessKey = configService.get('AWS_SECRET_ACCESS_KEY', {
    infer: true,
  });

  if (!accessKeyId || !secretAccessKey)
    throw new Error('AWS S3 connection failed');

  return new S3({ region, credentials: { accessKeyId, secretAccessKey } });
};
