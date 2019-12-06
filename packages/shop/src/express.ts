import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { server as graphqlServer } from './graphql/server';
import config from './config';

const app = express();

// middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

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
