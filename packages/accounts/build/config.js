"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dumpConfig = dumpConfig;
exports.default = void 0;
// import { VERSION, BUILD_DATE } from './version';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = {
  VERSION: '1.0.0',
  BUILD_DATE: 'Unknown',
  NODE_ENV: process.env.NODE_ENV,
  PORT: +process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

function isProd() {
  return process.env.NODE_ENV === 'production';
}

var _default = config;
exports.default = _default;

function dumpConfig(log, theConfig) {
  //
  // Dump config
  //
  const res = Object.entries(theConfig).map(([key, value]) => {
    const isSecret = key.includes('PASS') || key.includes('SECRET') || key.includes('TOKEN');
    if (isSecret && isProd()) return [key, '******'];
    return [key, value];
  });
  log.info('Config', res);
  log.info();
}