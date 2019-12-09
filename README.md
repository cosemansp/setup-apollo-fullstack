# Setup-Apollo-fullstack

## Quick Start

```bash
# Installs all dependencies and links any cross-dependencies
yarn bootstrap

# Clean all packages (apps)
# will run `yarn clean` in every package
yarn clean

# build all packages (apps)
# will run `yarn build` in every package
yarn build

# start all micro services
npx pm2 start

# show logs
npx pm2 log

# show running processes
npx pm2 list
```

## ToDo

[*] Basic graphql setup with Apollo and Typescript
[*] Shop Queries
[*] Accounts Queries
[*] Basic Gateway with Graphql Federation
[*] PM2 Setup to launch micro services and gateway
[*] Integration Testing with graphql
[*] Fast Integration Testing with Jest & MongoDB
[*] MongoDB & MongooseDataSource to accounts service
[*] Dataloader to avoid N+1 problem
[*] Basic JWT Security
[*] Mutations and error handling (see register & login)
[*] Combined integration testing with mongoDb & graphql
[ ] Advanced Federation features like type references, type extensions
[ ] Handling security with custom directives

## Resources

- https://github.com/Dreamscapes/eslint-import-resolver-lerna
- https://benoithubert.net/2019/08/express-react-monorepo-setup-with-lerna.html
- [Deploy serverless with Up](https://github.com/apex/up)
- [Engine + Lambda example](https://github.com/jbaxleyiii/basic-up-engine-example)
- [Merge schema's](https://github.com/Urigo/merge-graphql-schemas)
