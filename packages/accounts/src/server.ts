import app from './express';
import config, { dumpConfig } from './config';
import { log } from './logManager';
import { seedUsers } from './data/users';

// Dump Config
log.info(`-------- 'Accounts' starting: ${config.VERSION}  --------`);
dumpConfig(log, config);

// generate seed data
seedUsers(10);

// Listen for http request
const httpServer = app.listen(config.PORT, () => {
  log.info(`🚀  GraphQL server ready at http://localhost:${config.PORT}/graphql`);
});

// Grease full shutdown
const shutdown = async () => {
  log.warn('SIGTERM received, shutting down...');
  httpServer.close(() => {
    log.info('bye bye');
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);
