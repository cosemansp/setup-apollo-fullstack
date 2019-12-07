import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { apolloServer } from '../apolloServer';
import { seedProducts } from '../../data/products';

const { query, mutate } = createTestClient(apolloServer as any);

const BASKET_QUERY = gql`
  query {
    basket(checkoutID: "abc") {
      checkoutID
      items {
        id
        product {
          id
          title
        }
        quantity
      }
    }
  }
`;

describe('My test', () => {
  beforeAll(() => {
    seedProducts();
  });

  test('dot this', async () => {
    const result = await query({ query: BASKET_QUERY });
    expect(result.data).toMatchSnapshot();
  });
});
