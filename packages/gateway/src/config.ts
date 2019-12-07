import Logger from 'bunyan';
import dotEnvFlow from 'dotenv-flow';

// load config
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotEnvFlow.config();

// map to object
const config = {
  VERSION: '1.0.0',
  NODE_ENV: process.env.NODE_ENV,
  PORT: +process.env.PORT || 4000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  STARTUP_DELAY: Number(process.env.STARTUP_DELAY),
  POLL_INTERVAL: Number(process.env.POLL_INTERVAL || 0),
};

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
