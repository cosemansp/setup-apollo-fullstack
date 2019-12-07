"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
const resolvers = {
  Query: {
    me(root, args, context) {
      return {
        id: '12',
        name: 'john doe'
      };
    },

    users(root, args, context) {
      return null;
    }

  },
  Mutation: {// addOrUpdateProduct(root, args, context) {
    //   return null;
    // },
    // deleteProduct(root, args, context) {
    //   return null;
    // },
  }
};
exports.resolvers = resolvers;