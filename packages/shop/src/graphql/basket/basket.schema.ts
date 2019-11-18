import { gql } from 'apollo-server';

export const typeDefs = gql`
  type BasketItem {
    id: ID
    product: Product
    quantity: Int
  }

  type Basket {
    checkoutID: ID
    items: [BasketItem]
  }

  input BasketItemInput {
    quantity: Int!
    productId: Int!
  }

  input AddItemToBasketInput {
    checkoutID: ID!
    item: BasketItemInput!
  }

  input RemoveItemFromBasketInput {
    checkoutID: ID!
    productId: Int!
  }

  type AddItemToBasketPayload {
    basket: Basket
  }

  type RemoveItemFromBasketPayload {
    basket: Basket
  }

  type ClearBasketPayload {
    basket: Basket
  }

  # Queries

  extend type Query {
    basket(checkoutID: String!): Basket
  }

  # Mutations

  extend type Mutation {
    """
    Add product to basket
    1. If the product already exist in the basket the quantity is added
    2. Product not found: ERROR
    3. Product not in stock: ERROR
    """
    addItemToBasket(input: AddItemToBasketInput!): AddItemToBasketPayload

    """
    Remove the product from the basket
    """
    removeItemFromBasket(input: RemoveItemFromBasketInput!): RemoveItemFromBasketPayload

    """
    Empty the basket
    """
    clearBasket(checkoutID: ID): ClearBasketPayload
  }
`;
