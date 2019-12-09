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

  interface Error {
    reason: String!
    code: String
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

  type Registered {
    user: User!
    accessToken: String!
    expires: Int!
  }

  type Authentication {
    user: User!
    accessToken: String!
    expires: Int!
  }

  type UserAlreadyExistError implements Error {
    reason: String!
    code: String
  }

  type NotAuthorizedError implements Error {
    reason: String!
    code: String
  }

  union LoginPayload = Authentication | NotAuthorizedError
  union RegisterPayload = Registered | UserAlreadyExistError

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
    login(input: LoginInput): LoginPayload!

    """
    Register as a new user
    """
    register(input: RegisterInput): RegisterPayload!
  }
`;
