import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { apolloServer } from '../apolloServer';
import { seedProducts } from '../../data/products';

const { query, mutate } = createTestClient(apolloServer as any);

const PRODUCT_FRAGMENT = gql`
  fragment ProductParts on Product {
    id
    sku
    title
    desc
    image
    stocked
    basePrice
    price
  }
`;

describe('Product', () => {
  beforeAll(() => {
    seedProducts();
  });

  test('Query all products', async () => {
    const PRODUCTS_QUERY = gql`
      query {
        products {
          ...ProductParts
        }
      }
      ${PRODUCT_FRAGMENT}
    `;
    const result = await query({ query: PRODUCTS_QUERY });
    expect(result.data.products).toBeArray();
  });

  test('Query single product', async () => {
    const GET_PRODUCT_QUERY = gql`
      query($id: Int) {
        product(id: $id) {
          ...ProductParts
        }
      }
      ${PRODUCT_FRAGMENT}
    `;
    const result = await query({ query: GET_PRODUCT_QUERY, variables: { id: 1 } });
    expect(result.data.product).toMatchSnapshot();
  });
});
