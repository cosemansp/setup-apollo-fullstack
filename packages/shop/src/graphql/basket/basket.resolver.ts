import { Resolvers } from '../../types/graphql';

export const resolvers: Resolvers = {
  Query: {
    basket(root, { checkoutID }, context) {
      return null;
    },
  },
  Mutation: {
    addItemToBasket(root, { input }, context) {
      return null;
    },
    removeItemFromBasket(root, { input }, context) {
      return null;
    },
    clearBasket(root, { checkoutID }, context) {
      return null;
    },
  },
};
