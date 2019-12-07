"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

const typeDefs = _apolloServer.gql`
  # Types

  type User {
    id: ID!
    name: String
    email: String
  }

  # Queries

  type Query {
    me: User
    users: [User]
  }

  # Mutations

  type Mutation {
    """
    Login user
    """
    login(email: String, password: String): User

    """
    Register as a new user
    """
    register(name: String, email: String, password: String): User
  }
`;
exports.typeDefs = typeDefs;