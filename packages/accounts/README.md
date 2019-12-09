# Accounts

## Getting Started

```bash
# generate typings for resolvers
yarn gql:gen

# start service
yarn start  # start build version
yarn start:dev
yarn start:watch

# lint
yarn lint
yarn lint:types

# testing
yarn test           # single run unit tests
yarn test:watch     # test & watch
yarn test:ci        # single run CI (with junit reporting)
yarn test:int       # single run integration tests
yarn test:int:watch # integration test & watch

# build service
yarn build
```

## Resources

- https://patrickdesjardins.com/blog/apollo-graphql-resolvers-and-data-source-separation
- https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
- https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/
- https://medium.com/the-guild/authentication-and-authorization-in-graphql-and-how-graphql-modules-can-help-fadc1ee5b0c2
- [JWT Authentication Node.js Tutorial with GraphQL and React](https://www.youtube.com/watch?v=25GS0MLT8JU)
