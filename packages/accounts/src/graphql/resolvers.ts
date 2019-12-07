import { Resolvers } from './types';
import { getAllUsers, getUser, deleteUser } from '../data/users';

export const resolvers: Resolvers = {
  Query: {
    me(root, args, context) {
      return {
        id: 12,
        firstName: 'john',
        lastName: 'doe',
        email: 'test',
      };
    },
    user: (root, args, context) => {
      const user = getUser(args.id);
      return user;
    },
    users(root, args, context) {
      const users = getAllUsers();
      return users;
    },
  },
  Mutation: {
    // addOrUpdateProduct(root, args, context) {
    //   return null;
    // },
    // deleteProduct(root, args, context) {
    //   return null;
    // },
  },
};
