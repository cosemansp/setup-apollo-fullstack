import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import config from '../config';
import { resolvers, typeDefs } from './resolvers';

// more see https://github.com/apollographql/fullstack-tutorial/tree/master/final/client/src

const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       authorization: config.REACT_APP_GRAPHCMS_TOKEN,
//     }
//   });

//   return forward(operation);
// })

const httpLink = new HttpLink({
  uri: config.REACT_APP_GRAPHCMS_URL,
  headers: {
    authorization: config.REACT_APP_GRAPHCMS_TOKEN,
    'client-name': 'Space Explorer [web]',
    'client-version': '1.0.0',
  },
});

const cache = new InMemoryCache({});
cache.writeData({
  data: {},
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorMiddleware, httpLink]),
  cache,
  resolvers,
  typeDefs,
});
