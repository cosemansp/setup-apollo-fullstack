import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    noop: String
  }
  extend type Mutation {
    noop: String
  }
`

export const resolvers = {
  Mutation: {
  }
}
