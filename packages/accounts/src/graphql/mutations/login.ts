import { compare } from 'bcryptjs';
import { createAccessTokenPayload, createRefreshToken } from '../../auth';
import { NotAuthorizedError, Authentication, LoginMutation } from '../graphqlTypes';

/**
mutation {
  login(input: { email: "john.doe@gmail.com", password: "1234" }) {
    __typename
    ...on Authentication {
      user {
        id
        name
      }
    }
    ...on NotAuthorizedError {
      reason
    }
  } 
}
 */
export const login: LoginMutation = async (root, { input }, { dataSources, res }) => {
  const user = await dataSources.user.loadByQuery({ email: input.email });
  const password = user ? user.password : '';
  const validPassword = await compare(input.password, password);
  if (!validPassword) {
    return {
      __typename: 'NotAuthorizedError',
      code: 'invalidPassword',
      reason: `Email/password combination doesn't match`,
    } as NotAuthorizedError;
  }

  // generate refresh token and return as cookie
  // set in playground settings "request.credentials": "include" to work with the cookie
  res.cookie('jid', createRefreshToken(user), { httpOnly: true });

  // generate accessToken and return in payload
  return {
    __typename: 'Authentication',
    user,
    ...createAccessTokenPayload(user),
  } as Authentication;
};
