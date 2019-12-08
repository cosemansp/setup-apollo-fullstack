import { gql } from 'apollo-server';

export const typeDefs = gql`
  # Types

  # type Address {
  #   street: String
  #   city: String
  #   zip: String
  # }

  type User {
    id: ID
    name: String
    age: Int
    email: String
    image: String
    phone: String
    company: String
    # address: Address
  }

  # Queries

  type Query {
    me: User
    user(id: ID!): User
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
