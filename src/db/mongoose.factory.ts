import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { IConfigService } from 'src/config/configuration';

export const mongooseConnectionFactory = (
  configService: ConfigService<IConfigService>,
): MongooseModuleFactoryOptions | Promise<MongooseModuleFactoryOptions> => {
  const host = configService.get('DB_HOST', { infer: true });
  const port = configService.get('DB_PORT', { infer: true });

  return {
    uri: `mongodb://${host}:${port}/PetPal`,
  };
};
