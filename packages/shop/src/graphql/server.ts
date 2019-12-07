import { ApolloServer } from 'apollo-server-express';
// import { makeExecutableSchema } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs as Product, resolvers as productResolvers } from './product';
import { typeDefs as Basket, resolvers as basketResolvers } from './basket';
import { typeDefs as Root } from './root.schema';
import { Context } from './context';
import { graphqlLogger } from './logger';
import { logManager } from '../logManager';
import util from 'util';

const log = logManager.getLogger('root.graphql');

export const schema = buildFederatedSchema([
  { typeDefs: Root },
  { typeDefs: Product, resolvers: productResolvers },
  { typeDefs: Basket, resolvers: basketResolvers },
]);

// export const schema = makeExecutableSchema({
//   typeDefs: [Root, Product, Basket],
//   resolvers: [productResolvers, basketResolvers],
//   allowUndefinedInResolve: false,
// });

export const server = new ApolloServer({
  schema,
  context: ({ res, req }): Context => {
    // get user from authorization token
    // don't verity, authorization is performed at the gateway level
    // (jwt.decode(req.headers.authorization) || {}) as User;
    const user = { id: '123' };
    return {
      user,
      req,
    };
  },
  formatError: (err) => {
    log.error('GRAPQH_ERROR >>>', util.inspect(err, false, 4, true /* enable colors */));
    return err;
  },
  extensions: [() => graphqlLogger],
  playground: true,
  introspection: true,
});
