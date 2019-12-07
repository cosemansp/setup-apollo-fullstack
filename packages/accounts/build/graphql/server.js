"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.schema = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _apolloServer = require("apollo-server");

var _resolvers = require("./resolvers");

var _schema = require("./schema");

var _logManager = require("../logManager");

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = _logManager.logManager.getLogger('root.graphql');

const schema = (0, _apolloServer.makeExecutableSchema)({
  typeDefs: _schema.typeDefs,
  resolvers: _resolvers.resolvers,
  allowUndefinedInResolve: false
});
exports.schema = schema;
const server = new _apolloServerExpress.ApolloServer({
  schema,
  context: ({
    res,
    req
  }) => {
    // get user from authorization token
    // don't verity, authorization is performed at the gateway level
    // (jwt.decode(req.headers.authorization) || {}) as User;
    const user = {
      id: '123'
    };
    return {
      user,
      req
    };
  },
  formatError: err => {
    log.error('GRAPQH_ERROR >>>', _util.default.inspect(err, false, 4, true
    /* enable colors */
    ));
    return err;
  },
  playground: true,
  introspection: true
});
exports.server = server;