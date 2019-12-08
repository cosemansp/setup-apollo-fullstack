import app from './express';
import config, { dumpConfig } from './config';
import { log } from './logManager';
import * as db from './db';

// Dump Config
log.info(`-------- 'Accounts' starting: ${config.VERSION}  --------`);
dumpConfig(log, config);

let httpServer;
db.open()
  .then(() => {
    //
    // Listen for http request
    //
    httpServer = app
      .listen(config.PORT, () => {
        log.info(`🚀  GraphQL server ready at http://localhost:${config.PORT}/graphql`);
      })
      .on('error', (err) => {
        log.fatal(err.message);
        process.exit(-1);
      });
  })
  .catch((err) => {
    //
    // fatal startup error (DB or express)
    //
    if (err.toString().indexOf('ECONNREFUSED') >= 0) {
      log.error('Failed to connect to db, quitting...');
      process.exit(-1);
    }
    // other error
    log.error(err.message);
    process.exit(-1);
  });

// Grease full shutdown
const shutdown = async () => {
  log.warn('SIGTERM received, shutting down...');
  db.close();
  httpServer.close(() => {
    log.info('bye bye');
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);
