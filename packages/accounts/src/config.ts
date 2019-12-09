import Logger from 'bunyan';
import dotEnvFlow from 'dotenv-flow';

// load config
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotEnvFlow.config();

// map to object
const config = {
  VERSION: '1.0.0',
  NODE_ENV: process.env.NODE_ENV,
  PORT: +process.env.PORT || 3001,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/accounts',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret',
  FEDERATED: process.env.FEDERATED == 'true' || false,
};

export const isDev = () => config.NODE_ENV === 'development';
export const isTest = () => config.NODE_ENV === 'development';
export const isProduction = () => config.NODE_ENV === 'development';

export type Config = typeof config;

export default config as Config;

export function dumpConfig(log: Logger, theConfig: Config) {
  //
  // Dump config
  //
  const res = Object.entries(theConfig).map(([key, value]) => {
    const isSecret = key.includes('PASS') || key.includes('SECRET') || key.includes('TOKEN');
    if (isSecret && process.env.NODE_ENV === 'production') return [key, '******'];
    return [key, value];
  });
  log.info('Config', res);
  log.info();
}
