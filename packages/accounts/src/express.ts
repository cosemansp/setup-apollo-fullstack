import express from 'express';
import cors from 'cors';
import { server as graphqlServer } from './graphql/apolloServer';
import config from './config';

const app = express();

// middleware
app.use(cors());

// routes
app.get('/', (_, res) => {
  // alive ping
  res.json({
    status: 'OK',
    name: 'Shop',
    version: config.VERSION,
    buildDate: config.BUILD_DATE,
  });
});

// attach graphql
graphqlServer.applyMiddleware({
  app,
});

export default app;
