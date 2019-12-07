"use strict";

var _express = _interopRequireDefault(require("./express"));

var _config = _interopRequireWildcard(require("./config"));

var _logManager = require("./logManager");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dump Config
_logManager.log.info(`-------- 'Shop' starting: ${_config.default.VERSION}  --------`);

(0, _config.dumpConfig)(_logManager.log, _config.default); // generate seed data
// seedUsers();
// Listen for http request

const httpServer = _express.default.listen(_config.default.PORT, () => {
  _logManager.log.info(`🚀  GraphQL server ready at http://localhost:${_config.default.PORT}/graphql`);
}); // Grease full shutdown


const shutdown = async () => {
  _logManager.log.warn('SIGTERM received, shutting down...');

  httpServer.close(() => {
    _logManager.log.info('bye bye');

    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);