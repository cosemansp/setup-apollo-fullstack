import { createAccessTokenPayload } from '../../auth';
import { RegisterMutation, UserAlreadyExistError, Registered } from '../graphqlTypes';

/**
  mutation {
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
export const register: RegisterMutation = async (root, { input }, { dataSources }) => {
  // check if the email is already in use
  const user = await dataSources.user.loadByQuery({ email: input.email });
  if (user) {
    return {
      __typename: 'UserAlreadyExistError',
      reason: `Email is already in use`,
    } as UserAlreadyExistError;
  }

  // new user, register it as new user
  const newUser = await dataSources.user.registerUser(input.name, input.email, input.password);
  return {
    __typename: 'Registered',
    user: newUser,
    ...createAccessTokenPayload(newUser),
  } as Registered;
};
