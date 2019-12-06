import gql from 'graphql-tag';

export default gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
