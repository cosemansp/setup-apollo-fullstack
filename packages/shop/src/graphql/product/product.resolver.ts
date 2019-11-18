import { Resolvers } from '../../types/graphql';

export const resolvers: Resolvers = {
  Query: {
    product(root, args, context) {
      return null;
    },
    allProducts(root, { orderBy, first, after, before, last }, { user }) {
      return null;
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
