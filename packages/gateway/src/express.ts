import express from 'express';
import config from './config';

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

// attach graphql
apolloServer.applyMiddleware({
  app,
});

export default app;
