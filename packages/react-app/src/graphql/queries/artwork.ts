import gql from 'graphql-tag';

export default gql`
  query getArtwork($where: AssetWhereInput, $orderBy: AssetOrderByInput) {
    assets(first: 50, where: $where, orderBy: $orderBy) {
      status
      id
      handle
      mimeType
      title
      category
      description
      year
      altText
      dimension
      url
    }
  }
`;
