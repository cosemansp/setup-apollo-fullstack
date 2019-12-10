import util from 'util';
import { Request } from 'express';
import { GraphQLSchema } from 'graphql';
import { formatError } from 'apollo-errors';
import { verify, decode } from 'jsonwebtoken';
import { makeExecutableSchema } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer, mergeSchemas } from 'apollo-server-express';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { Context, JWTPayload } from './context';
import { logManager } from '../logManager';
import { graphqlLogger } from './logger';
import { UserDataSource } from '@/dataSources/userDataSource';
import config from '@/config';
import { AuthDirective } from './directives';

const log = logManager.getLogger('root.graphql');

// create GraphqlSchema
let graphqlSchema: GraphQLSchema;
if (config.FEDERATED) {
  // Federated schema
  const federatedSchema = buildFederatedSchema([{ typeDefs, resolvers }]);
  // TODO: need to test if this works
  graphqlSchema = mergeSchemas({
    schemas: [federatedSchema],
    schemaDirectives: {
      auth: AuthDirective,
    },
  });
} else {
  // Local schema
  graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective,
    },
    allowUndefinedInResolve: true,
  });
}

const verifyAndDecodeToken = (req: Request) => {
  const authorization = req.headers.authorization;
  const token = authorization ? authorization.split(' ')[1] : '';
  if (!token) {
    return null;
  }

  try {
    if (config.FEDERATED) {
      // when federated, let the gateway verify the token
      return decode(token) as JWTPayload;
    }
    return verify(token, config.ACCESS_TOKEN_SECRET) as JWTPayload;
  } catch (err) {
    // we don't throw an error here
    // the auth directives will handle the authorization
    log.warn('Failed to verify accessToken, ERR: ', err.message);
    return null;
  }
};

// we need to omit the dataSources because they are added later by the graphqlServer
type BaseContext = Omit<Context, 'dataSources'>;

export const apolloServer = new ApolloServer({
  schema: graphqlSchema,
  context: ({ res, req }): BaseContext => {
    return {
      req,
      res,
      user: verifyAndDecodeToken(req),
    };
  },
  dataSources() {
    return {
      user: new UserDataSource(),
    };
  },
  // formatError: (err) => {
  //   log.error('GRAPQH_ERROR >>>', util.inspect(err, false, 4, true /* enable colors */));
  //   return err;
  // },
  formatError: formatError as any,
  extensions: [() => graphqlLogger],
  playground: true,
  introspection: true,
  debug: true,
});

export const schema = graphqlSchema;
