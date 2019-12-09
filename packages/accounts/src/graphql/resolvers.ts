import { Resolvers } from './graphqlTypes';
import { register, login, updateUser, removeUser } from './mutations';

export const resolvers: Resolvers = {
  Query: {
    //
    // query me
    //
    me(root, args, { dataSources, user }) {
      // check if user is available (valid token)
      if (!user) {
        return null;
      }

      // retrieve user
      return dataSources.user.loadOne(user && user.sub);
    },

    //
    // query user
    //
    user(root, args, { dataSources }) {
      return dataSources.user.loadOne(args.id);
    },

    //
    // query users
    //
    users(root, args, { dataSources }) {
      return dataSources.user.loadManyByQuery({});
    },
  },
  LoginPayload: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
  RegisterPayload: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
  Mutation: {
    register,
    login,
    updateUser,
    removeUser,
  },
};
