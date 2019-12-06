const defaultLogLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'info';
const logLevel: any = process.env.LOG_LEVEL || defaultLogLevel;

const config = {
  NODE_ENV: process.env.NODE_ENV || '',
  LOG_LEVEL: logLevel,
  VERSION: process.env.VERSION,
  REACT_APP_GRAPHCMS_URL: process.env.REACT_APP_GRAPHCMS_URL,
  REACT_APP_GRAPHCMS_TOKEN: process.env.REACT_APP_GRAPHCMS_TOKEN,
};

export type Config = typeof config;
export default config;
