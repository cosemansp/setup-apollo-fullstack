import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Product {
    id: Int
    sku: String
    title: String
    desc: String
    image: String
    stocked: Boolean
    basePrice: Float
    price: Float
  }

  input ProductInput {
    id: Int
    sku: String!
    title: String!
    desc: String
    image: String
    stocked: Boolean
    basePrice: Float
    price: Float!
  }

  type ProductEdge {
    node: Product
    cursor: String!
  }

  type ProductConnection {
    pageInfo: PageInfo!
    edges: [ProductEdge]
    totalCount: Int
    product: [Product]
  }

  type AddOrUpdateProductPayload {
    product: Product
  }

  type DeleteProductPayload {
    product: Product
  }

  # Queries

  type Query {
    product(id: Int): Product
    allProducts(
      orderBy: String
      first: Int
      after: String
      before: String
      last: Int
    ): ProductConnection
  }

  # Mutations

  type Mutation {
    """
    Create or save a product
    """
    addOrUpdateProduct(input: ProductInput!): AddOrUpdateProductPayload

    """
    Remove a product
    """
    deleteProduct(id: Int!): DeleteProductPayload
  }
`;
