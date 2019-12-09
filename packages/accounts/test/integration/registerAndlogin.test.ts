import gql from 'graphql-tag';
import { createTestClient } from '@test/apolloServerTesting';
import { apolloServer } from '@/graphql/apolloServer';
import { openDb, closeDb, clearDb } from '@test/dbHelper';
import { UserModel } from '@/domain/userModel';

const { mutate } = createTestClient(apolloServer);

const REGISTER_MUTATION = gql`
  mutation registerUser($input: RegisterInput!) {
    register(input: $input) {
      __typename
      ... on Registered {
        user {
          id
          name
          email
        }
        accessToken
      }
      ... on UserAlreadyExistError {
        reason
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation loginUser($input: LoginInput!) {
    login(input: $input) {
      __typename
      ... on Authentication {
        user {
          id
          name
          email
        }
        accessToken
      }
      ... on NotAuthorizedError {
        reason
      }
    }
  }
`;

describe('registerAndLogin', () => {
  beforeAll(() => openDb());
  beforeEach(clearDb);
  afterAll(closeDb);

  test('scenario register & login', async () => {
    // register
    const registerResult = await mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        input: {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          password: '12345',
        },
      },
    });
    expect(registerResult.errors).toBeUndefined();
    expect(registerResult.data).toMatchSnapshot({
      register: {
        user: {
          id: expect.any(String),
        },
        accessToken: expect.any(String),
      },
    });

    // success login
    const loginResult = await mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          email: 'john.doe@gmail.com',
          password: '12345',
        },
      },
    });
    expect(loginResult.errors).toBeUndefined();
    expect(loginResult.data).toMatchSnapshot({
      login: {
        user: {
          id: expect.any(String),
        },
        accessToken: expect.any(String),
      },
    });

    // bad login
    const loginResult2 = await mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          email: 'john.doe@gmail.com',
          password: 'unknown',
        },
      },
    });
    expect(loginResult2.errors).toBeUndefined();
    expect(loginResult2.data).toEqual({
      login: {
        __typename: 'NotAuthorizedError',
        reason: expect.any(String),
      },
    });
  });

  test(`register fails when email exist`, async () => {
    const user = new UserModel({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    });
    await user.save();

    // register
    const registerResult = await mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        input: {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          password: '12345',
        },
      },
    });
    expect(registerResult.errors).toBeUndefined();
    expect(registerResult.data).toEqual({
      register: {
        __typename: 'UserAlreadyExistError',
        reason: expect.any(String),
      },
    });
  });
});
