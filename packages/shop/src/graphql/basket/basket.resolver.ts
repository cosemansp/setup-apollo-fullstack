import { Resolvers } from '../types';

export const resolvers: Resolvers = {
  Query: {
    basket: (root, { checkoutID }, { dataSources }) => {
      return dataSources.basket.getOrCreateBasket(checkoutID);
    },
  },
  BasketItem: {
    product: (item, _, { dataSources }) => {
      const product = dataSources.products.getById(item.product.id);
      return product;
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
