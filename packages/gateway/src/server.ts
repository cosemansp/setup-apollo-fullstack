import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import config, { dumpConfig } from './config';
import { gateway } from './gateway';
import { log } from './logManager';

// Dump Config
log.info(`-------- 'Shop' starting: ${config.VERSION}  --------`);
dumpConfig(log, config);

createApp()
  .then((app) => {
    // Listen for http request
    const httpServer = app.listen(config.PORT, () => {
      log.info(`🚀  GraphQL server ready at http://localhost:${config.PORT}/graphql`);
    });

    // Grease full shutdown
    const shutdown = async () => {
      log.info('SIGTERM received, shutting down...');
      httpServer.close(() => {
        log.info('bye bye');
        process.exit(0);
      });
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    process.on('SIGQUIT', shutdown);
  })
  .catch((error) => {
    log.error(error);
    process.exit(-1);
  });

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function createApp(): Promise<Express> {
  const app = express();

  // routes
  app.get('/', (_, res) => {
    // alive ping
    res.json({
      status: 'OK',
      name: 'Shop',
      version: config.VERSION,
    });
  });

  // delay loading of federated schema until services can startup
  if (config.STARTUP_DELAY) {
    log.info('Waiting to load federated schemas...');
    await wait(config.STARTUP_DELAY);
  }

  // load federation schema
  // this throws an error when no federated services are not available
  const gatewayConfig = await gateway.load();

  // create apollo server to proxy the federation requests
  const apolloServer = new ApolloServer({
    ...gatewayConfig,
    context: ({ req }) => {
      return { ...req.headers };
    },
  });

  // attach graphql
  apolloServer.applyMiddleware({
    app,
  });

  return app;
}
