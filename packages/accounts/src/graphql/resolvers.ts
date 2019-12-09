import { Resolvers, User, ResolversTypes } from './types';
import { compare } from 'bcryptjs';
import { createAccessTokenPayload, createRefreshToken } from '../auth';

export const resolvers: Resolvers = {
  Query: {
    /**
      query {
        me {
          id
          name
        }
      }
     */
    me(root, args, { dataSources, user }) {
      // check if user is available (valid token)
      if (!user) {
        return null;
      }

      // retrieve user
      return dataSources.user.loadOne(user && user.sub);
    },

    /**
      query {
        user(id: '5dee276e66b31e0f91aceb37') {
          id
          name
        }
      }
    */
    async user(root, args, { dataSources }) {
      return dataSources.user.loadOne(args.id);
    },

    /**
      query {
        users {
          id
          name
        }
      }
    */
    async users(root, args, { dataSources }) {
      return dataSources.user.loadManyByQuery({});
    },
  },
  Mutation: {
    /**
      query {
        register(
          input: { name: "John Doe", email: "john.doe@gmail.com", password: "123" }
        ) {
          __typename
          ... on Registered {
            user {
              id
              name
              email
            }
          }
          ... on UserAlreadyExistError {
            reason
          }
        }
      }
    */
    async register(root, { input }, { dataSources }) {
      // check if the email is already in use
      const user = await dataSources.user.loadOneByQuery({ email: input.email });
      if (user) {
        return {
          __typename: 'UserAlreadyExistError',
          reason: `Email is already in use`,
        } as ResolversTypes['UserAlreadyExistError'];
      }

      // new user, register it as new user
      const newUser = await dataSources.user.registerUser(input.name, input.email, input.password);
      return {
        __typename: 'Registered',
        user: newUser,
        ...createAccessTokenPayload(user),
      } as ResolversTypes['Registered'];
    },

    /**
     * login(input: { email: "john.doe@gmail.com", password: "1234" }) {
     *   __typename
     *   ...on Authentication {
     *     user {
     *       id
     *       name
     *     }
     *   }
     *   ...on NotAuthorizedError {
     *     reason
     *   }
     * }
     */
    async login(root, { input }, { dataSources, res }) {
      const user = await dataSources.user.loadOneByQuery({ email: input.email });
      const password = user ? user.password : '';
      const validPassword = await compare(input.password, password);
      if (!validPassword) {
        return {
          __typename: 'NotAuthorizedError',
          code: 'invalidPassword',
          reason: `Email/password combination doesn't match`,
        } as ResolversTypes['NotAuthorizedError'];
      }

      // generate refresh token and return as cookie
      // set in playground settings "request.credentials": "include" to work with the cookie
      res.cookie('jid', createRefreshToken(user), { httpOnly: true });

      // generate accessToken and return in payload
      return {
        __typename: 'Authentication',
        user,
        ...createAccessTokenPayload(user),
      } as ResolversTypes['Authentication'];
    },
  },
};
