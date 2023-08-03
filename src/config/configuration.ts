export enum ConfigurationEnum {
  PORT = 'PORT',
  DB_PORT = 'DB_PORT',
  DB_HOST = 'DB_HOST',
  JWT_SECRET = 'JWT_SECRET',
  MODE = 'MODE',
  AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY',
  AWS_REGION = 'AWS_REGION',
  AWS_S3_ERRORS_BUCKET = 'AWS_S3_ERRORS_BUCKET',
}

export default () => ({
  [ConfigurationEnum.PORT]: +process.env.PORT || 3000,
  [ConfigurationEnum.DB_HOST]: process.env.DB_HOST,
  [ConfigurationEnum.DB_PORT]: parseInt(process.env.DB_PORT, 10) || 27017,
  [ConfigurationEnum.JWT_SECRET]:
    process.env.JWT_SECRET || 'very secret strong',
  [ConfigurationEnum.MODE]: process.env.MODE || 'development',
  [ConfigurationEnum.AWS_ACCESS_KEY_ID]: process.env.AWS_ACCESS_KEY_ID,
  [ConfigurationEnum.AWS_SECRET_ACCESS_KEY]: process.env.AWS_SECRET_ACCESS_KEY,
  [ConfigurationEnum.AWS_REGION]: process.env.AWS_REGION,
  [ConfigurationEnum.AWS_S3_ERRORS_BUCKET]: process.env.AWS_S3_ERRORS_BUCKET,
});
