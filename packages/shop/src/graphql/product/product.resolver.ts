import { Resolvers } from '../types';
import { getAllProducts, getProduct } from '../../data/products';
import sortOn from 'sort-on';
import arrayToConnection from '../../utils/arrayToConnection';

export const resolvers: Resolvers = {
  Query: {
    product(root, args, context) {
      return getProduct(args.id);
    },
    products(root, args, { user }) {
      let products = getAllProducts();
      if (args.orderBy) {
        products = sortOn(products, args.orderBy);
      }
      return products;
    },
    productsConnection(root, args, { user }) {
      let products = getAllProducts();
      if (args.orderBy) {
        products = sortOn(products, args.orderBy);
      }
      return {
        ...arrayToConnection(products, args),
      };
    },
  },
  Mutation: {
    addOrUpdateProduct(root, args, context) {
      return null;
    },
    deleteProduct(root, args, context) {
      return null;
    },
  },
};
