import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'apollo-server';
import { typeDefs as Product, resolvers as productResolvers } from './product';
import { typeDefs as Basket, resolvers as basketResolvers } from './basket';
import { typeDefs as Root, resolvers as rootResolvers } from './root.schema';
import { Context } from './context';
import { graphqlLogger } from './logger';

export const schema = makeExecutableSchema({
  typeDefs: [Root, Product, Basket],
  resolvers: [rootResolvers, productResolvers, basketResolvers],
  allowUndefinedInResolve: false,
});

export const server = new ApolloServer({
  schema,
  context: ({ res, req }): Context => {
    // get user from authorization token
    // don't verity, authorization is performed at the gateway level
    const user = { id: '123' }; // (jwt.decode(req.headers.authorization) || {}) as User;
    // log.debug('User', user);
    return {
      user,
    };
  },
  formatError: (err) => {
    // log.error('GRAPQH_ERROR >>>', util.inspect(err, false, 4, true /* enable colors */));
    return err;
  },
  extensions: [() => graphqlLogger],
  playground: true,
  introspection: true,
});
