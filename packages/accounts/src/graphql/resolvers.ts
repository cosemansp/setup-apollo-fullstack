import { Resolvers, User } from './types';
import { UserModel } from '../domain/userModel';

export const resolvers: Resolvers = {
  Query: {
    me(root, args, context) {
      return {
        id: 12,
        name: 'john doe',
        email: 'test',
      };
    },
    async user(root, args, { dataSources }) {
      return await dataSources.user.loadOne(args.id);
    },
    async users(root, args, { dataSources }) {
      return await dataSources.user.loadManyByQuery({});
    },
  },
  Mutation: {
    async register(root, args, { dataSources }) {
      const user = new UserModel({
        name: args.name,
        email: args.email,
        password: args.password,
      });
      return await user.save();
    },
  },
};
