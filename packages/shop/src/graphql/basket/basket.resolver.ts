import { Resolvers } from '../types';
import { getProduct } from '../../data/products';
import { getOrCreateBasket } from '../../data/basket';

export const resolvers: Resolvers = {
  Query: {
    basket: (root, { checkoutID }) => {
      let basket = getOrCreateBasket(checkoutID);
      basket = basket
        .filter((item) => {
          // filter out the empty once
          const product = getProduct(item.productId);
          return !!product;
        })
        .map((item) => {
          return {
            // map to graphql entity
            ...item,
            product: {
              id: item.productId,
            },
          };
        });
      return {
        checkoutID,
        items: basket,
      };
    },
  },
  BasketItem: {
    product: (item) => {
      const product = getProduct(item.product.id);
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
