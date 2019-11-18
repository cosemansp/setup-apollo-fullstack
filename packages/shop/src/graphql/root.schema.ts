import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar JSON
  scalar Date

  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;

export const resolvers = {};
