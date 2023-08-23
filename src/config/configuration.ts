export interface IConfigService {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  JWT_SECRET: string;
  MODE: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_S3_ERRORS_BUCKET: string;
  AWS_S3_SETIFICATES_BUCKET: string;
}

export default () =>
  ({
    PORT: +process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT, 10),
    JWT_SECRET: process.env.JWT_SECRET,
    MODE: process.env.MODE,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_ERRORS_BUCKET: process.env.AWS_S3_ERRORS_BUCKET,
    AWS_S3_SETIFICATES_BUCKET: process.env.AWS_S3_SETIFICATES_BUCKET,
  } as IConfigService);
