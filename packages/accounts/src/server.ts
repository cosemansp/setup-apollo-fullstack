// Import this first
/* eslint-disable import/first, import/newline-after-import */
import dotEnvFlow from 'dotenv-flow';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotEnvFlow.config();

import express from 'express';
import bodyParser from 'body-parser';
import config, { dumpConfig } from './config';
import { log } from './logManager';

log.info(`-------- 'simple' starting: ${config.BUILD_VERSION}  --------`);
dumpConfig(log, config);

const port = process.env.PORT || 5000;
const app = express();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
