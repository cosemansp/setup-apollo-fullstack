import gql from 'graphql-tag';
import { createTestClient } from '@test/apolloServerTesting';
import { apolloServer } from '@/graphql/apolloServer';
import { openDb, closeDb, clearDb } from '@test/dbHelper';
import { UserModel } from '@/domain/userModel';
import { sign } from 'jsonwebtoken';
import config from '@/config';

const token = sign({ roles: ['admin'], scopes: ['user:Read'] }, config.ACCESS_TOKEN_SECRET);
const { query } = createTestClient(apolloServer, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

describe('query users', () => {
  beforeAll(() => openDb());
  beforeEach(clearDb);

  let user1;
  let user2;
  beforeEach(async () => {
    // inject users
    user1 = new UserModel({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    });
    user2 = new UserModel({
      name: 'Jane Zoe',
      email: 'jane.zoe@gmail.com',
    });
    await user1.save();
    await user2.save();
  });
  afterAll(closeDb);

  test(`single`, async () => {
    const result = await query({
      query: gql`
        query($id: ID!) {
          user(id: $id) {
            name
            email
          }
        }
      `,
      variables: {
        id: user2.id,
      },
    });
    expect(result.errors).toBeUndefined();
    expect(result.data.user).toBeDefined();
    expect(result.data.user).toEqual({
      email: user2.email,
      name: user2.name,
    });
  });

  test(`multiple`, async () => {
    const result = await query({
      query: gql`
        query {
          users {
            name
            email
          }
        }
      `,
    });
    expect(result.errors).toBeUndefined();
    expect(result.data.users).toBeDefined();
    expect(result.data).toHaveArrayOfSize('users', 2);
    expect(result.data.users[0]).toEqual({
      email: user1.email,
      name: user1.name,
    });
    expect(result.data.users[1]).toEqual({
      email: user2.email,
      name: user2.name,
    });
  });
});
