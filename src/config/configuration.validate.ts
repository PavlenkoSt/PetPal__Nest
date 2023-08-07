import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

import { IConfigService } from './configuration';

enum MODE_ENUM {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

class ConfigValidation {
  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  @IsEnum(MODE_ENUM)
  MODE: MODE_ENUM;

  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_S3_ERRORS_BUCKET: string;
}

export const validate = (config: IConfigService) => {
  const validatedConfig = plainToInstance(ConfigValidation, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`environment variables incorrect -> ${errors.toString()}`);
  }

  return validatedConfig;
};
