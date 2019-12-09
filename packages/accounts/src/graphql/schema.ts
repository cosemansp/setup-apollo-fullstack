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

  input AddressInput {
    street: String
    city: String
    zip: String
  }

  input UserInput {
    name: String
    email: String
    age: Int
    image: String
    phone: String
    company: String
    address: AddressInput
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

  type UserAlreadyExistError {
    reason: String!
    code: String
  }

  type NotAuthorizedError {
    reason: String!
    code: String
  }

  union LoginPayload = Authentication | NotAuthorizedError
  union RegisterPayload = Registered | UserAlreadyExistError

  type UserPayload {
    user: User
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
    login(input: LoginInput!): LoginPayload!

    """
    Register as a new user
    """
    register(input: RegisterInput!): RegisterPayload!

    """
    Update a existing User (Admin)
    """
    updateUser(id: ID!, input: UserInput!): UserPayload!

    """
    Remove a User (Admin)
    """
    removeUser(id: ID!): UserPayload!
  }
`;
