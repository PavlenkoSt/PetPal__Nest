export enum ConfigurationEnum {
  PORT = 'PORT',
  DB_PORT = 'DB_PORT',
  DB_HOST = 'DB_HOST',
  JWT_SECRET = 'JWT_SECRET',
  MODE = 'MODE',
}

export default () => ({
  [ConfigurationEnum.PORT]: +process.env.PORT || 3000,
  [ConfigurationEnum.DB_HOST]: process.env.DB_HOST,
  [ConfigurationEnum.DB_PORT]: parseInt(process.env.DB_PORT, 10) || 27017,
  [ConfigurationEnum.JWT_SECRET]:
    process.env.JWT_SECRET || 'very secret strong',
  [ConfigurationEnum.MODE]: process.env.MODE || 'development',
});
