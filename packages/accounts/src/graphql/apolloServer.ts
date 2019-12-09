import util from 'util';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { GraphQLSchema } from 'graphql';
import { verify, decode } from 'jsonwebtoken';
import { makeExecutableSchema } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { Context, JWTPayload } from './context';
import { logManager } from '../logManager';
import { UserDataSource } from '@/dataSources/userDataSource';
import config from '@/config';

const log = logManager.getLogger('root.graphql');

// create GraphqlSchema
let graphqlSchema: GraphQLSchema;
if (config.FEDERATED) {
  graphqlSchema = buildFederatedSchema([{ typeDefs, resolvers }]);
} else {
  graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    allowUndefinedInResolve: true,
  });
}

// we need to omit the dataSources because they are added later by the graphqlServer
type BaseContext = Omit<Context, 'dataSources'>;

export const server = new ApolloServer({
  schema: graphqlSchema,
  context: ({ res, req }): BaseContext => {
    // Base context
    const context: BaseContext = {
      req,
      res,
    };

    // Add user on context if we have an authorization header
    try {
      const authorization = req.headers.authorization;
      const token = authorization ? authorization.split(' ')[1] : '';
      if (token) {
        // if we have a token, verify it
        if (config.FEDERATED) {
          // when federated, let the gateway verify the token
          context.user = decode(token) as JWTPayload;
        } else {
          context.user = verify(token, config.ACCESS_TOKEN_SECRET) as JWTPayload;
        }
      }
    } catch (err) {
      // we don't throw an error here
      // the auth directives will handle the authorization
      log.warn('Failed to verify accessToken, ERR: ', err.message);
    }
    return context;
  },
  dataSources() {
    return {
      user: new UserDataSource(),
    };
  },
  formatError: (err) => {
    log.error('GRAPQH_ERROR >>>', util.inspect(err, false, 4, true /* enable colors */));
    return err;
  },
  playground: true,
  introspection: true,
});

export const schema = graphqlSchema;
