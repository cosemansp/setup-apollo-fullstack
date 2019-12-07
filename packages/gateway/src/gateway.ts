// import * as jwt from 'jsonwebtoken';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import config from './config';
import { getConfig } from './support';
import { log } from './logManager';

class ProxyDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.headers) {
      console.log(context.headers);
      Object.entries(context.headers).forEach(([key, value]) => {
        request.http.headers.set(key, value);
      });
    }
  }
}

export const gateway = new ApolloGateway({
  serviceList: getConfig(),
  experimental_pollInterval: config.POLL_INTERVAL,
  buildService({ name, url }) {
    log.info('buildService', url);
    return new ProxyDataSource({ url });
  },
  // debug: true,
});
