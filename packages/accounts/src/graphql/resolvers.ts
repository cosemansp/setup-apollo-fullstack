import { Resolvers, User } from './types';
import { UserModel } from '../domain/userModel';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '@/config';
import { createAccessToken, createRefreshToken } from '../auth';

export const resolvers: Resolvers = {
  Query: {
    me(root, args, context) {
      return {
        id: '12',
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
    async register(root, { input }, { dataSources }) {
      const user = await dataSources.user.registerUser(input.name, input.email, input.password);
      return {
        user,
      };
    },
    async login(root, { input }, { dataSources, res }) {
      const user = await dataSources.user.loadOneByQuery({ email: input.email });
      if (!user) {
        return {
          error: 'invalidUser',
        };
      }
      const valid = await compare(input.password, user.password);
      if (!valid) {
        return {
          error: 'invalidUserPassword',
        };
      }

      // generate refresh token and return as cookie
      // set in playground settings "request.credentials": "include" to work with the cookie
      res.cookie('jid', createRefreshToken(user), { httpOnly: true });

      // generate accessToken and return in payload
      return {
        user,
        accessToken: createAccessToken(user),
        expires: 15 * 60 * 60,
      };
    },
  },
};
