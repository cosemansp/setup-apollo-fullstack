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
