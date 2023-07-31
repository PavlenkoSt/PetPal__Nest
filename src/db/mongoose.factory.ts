import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { ConfigurationEnum } from 'src/config/configuration';
import { mongoGenerateURL } from './mongo-generate-url.util';

export const mongooseConnectionFactory = (
  configService: ConfigService,
): MongooseModuleFactoryOptions | Promise<MongooseModuleFactoryOptions> => {
  const host = configService.get<string>(ConfigurationEnum.DB_HOST);
  const port = configService.get<number>(ConfigurationEnum.DB_PORT);

  return {
    uri: mongoGenerateURL(host, port),
  };
};
