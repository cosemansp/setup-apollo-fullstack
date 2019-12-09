import { gql } from 'apollo-server';

export const typeDefs = gql`
  # Types

  type Address {
    street: String
    city: String
    zip: String
  }

  type User {
    id: ID
    name: String
    age: Int
    email: String
    image: String
    phone: String
    company: String
    address: Address
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type RegisterPayload {
    user: User
  }

  type LoginPayload {
    error: String
    user: User
    accessToken: String
    expires: Int
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
    login(input: LoginInput): LoginPayload

    """
    Register as a new user
    """
    register(input: RegisterInput): RegisterPayload
  }
`;
