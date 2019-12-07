// import * as jwt from 'jsonwebtoken';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import config from './config';

class ProxyDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // request.http.headers.set('x-user-id', context.userId);
    // proxy all headers
    Object.entries({ ...context }).forEach(([key, value]) => request.http.headers.set(key, value));
  }
}

const serviceList = [
  { name: 'shop', url: config.SERVICE_SHOP_URL },
  { name: 'accounts', url: config.SERVICE_ACCOUNTS_URL },
];

export const gateway = new ApolloGateway({
  serviceList,
  buildService({ name, url }) {
    return new ProxyDataSource({ url });
  },
  debug: true,
});
