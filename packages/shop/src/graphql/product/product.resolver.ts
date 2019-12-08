import { Resolvers } from '../types';
import sortOn from 'sort-on';
import arrayToConnection from '../../utils/arrayToConnection';

export const resolvers: Resolvers = {
  Query: {
    product(root, args, { dataSources }) {
      return dataSources.products.getById(args.id);
    },
    products(root, args, { user, dataSources }) {
      let products = dataSources.products.getAll();
      if (args.orderBy) {
        products = sortOn(products, args.orderBy);
      }
      return products;
    },
    productsConnection(root, args, { user, dataSources }) {
      let products = dataSources.products.getAll();
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
