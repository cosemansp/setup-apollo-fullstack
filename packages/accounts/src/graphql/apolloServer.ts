import { ApolloServer } from 'apollo-server-express';
// import { makeExecutableSchema } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { Context } from './context';
import { logManager } from '../logManager';
import util from 'util';
import { UserDataSource } from '@/dataSources/userDataSource';

const log = logManager.getLogger('root.graphql');

export const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

// export const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
//   allowUndefinedInResolve: true,
// });

export const server = new ApolloServer({
  schema,
  context: ({ res, req }): Omit<Context, 'dataSources'> => {
    // get user from authorization token
    // don't verity, authorization is performed at the gateway level
    // (jwt.decode(req.headers.authorization) || {}) as User;
    const user = { id: '123' };
    return {
      user,
      req,
    };
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
