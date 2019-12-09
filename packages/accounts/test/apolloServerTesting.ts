import express from 'express';
import httpMocks from 'node-mocks-http';
import { print } from 'graphql';
import { convertNodeHttpToRequest, runHttpQuery } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';

import { DocumentNode } from 'graphql';
import { GraphQLResponse } from 'apollo-server-types';

// Drop in replacement for apollo-server-testing:createTestClient
// but improved with:
// - mocked response and request
// - real http POST request
// - handles the graphq exception errors like the real setup
//
// Original code from https://github.com/zapier/apollo-server-integration-testing

const mockRequest = (options = {}) =>
  httpMocks.createRequest({
    method: 'POST',
    ...options,
  });

const mockResponse = (options = {}) => httpMocks.createResponse(options);

type StringOrAst = string | DocumentNode;

type Query = {
  query: StringOrAst;
  mutation?: undefined;
  variables?: {
    [name: string]: any;
  };
};
type Mutation = {
  mutation: StringOrAst;
  query?: undefined;
  variables?: {
    [name: string]: any;
  };
};

export interface ApolloServerTestClient {
  query: (query: Query) => Promise<GraphQLResponse>;
  mutate: (mutation: Mutation) => Promise<GraphQLResponse>;
}

export const createTestClient = (
  // The ApolloServer instance that will be used for handling the queries you run in your tests.
  // Must be an instance of the ApolloServer class from `apollo-server-express` (or a compatible subclass).
  apolloServer: ApolloServer,
  // Extends the mocked Request object with additional keys.
  // Useful when your apolloServer `context` option is a callback that operates on the passed in `req` key,
  // and you want to inject data into that `req` object.
  // If you don't pass anything here, we provide a default request mock object for you.
  extendMockRequest: any = {},
  // Extends the mocked Response object with additional keys.
  // Useful when your apolloServer `context` option is a callback that operates on the passed in `res` key,
  // and you want to inject data into that `res` object (such as `res.locals`).
  // If you don't pass anything here, we provide a default response mock object for you.
  extendMockResponse: any = {},
): ApolloServerTestClient => {
  const app = express();
  apolloServer.applyMiddleware({ app });

  const test = async ({ query, mutation, ...args }: Query | Mutation) => {
    const req = mockRequest(extendMockRequest);
    const res = mockResponse(extendMockResponse);
    const operation = query || mutation;
    const { variables } = args;

    const graphQLOptions = await apolloServer.createGraphQLServerOptions(req, res);

    const { graphqlResponse } = await runHttpQuery([req, res], {
      method: 'POST',
      options: graphQLOptions,
      query: {
        // operation can be a string or an AST, but `runHttpQuery` only accepts a string
        query: typeof operation === 'string' ? operation : print(operation),
        variables,
      },
      request: convertNodeHttpToRequest(req),
    });
    return JSON.parse(graphqlResponse);
  };

  return { query: test, mutate: test };
};
