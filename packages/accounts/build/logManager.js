"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = exports.logManager = void 0;

var _bunyan = _interopRequireDefault(require("bunyan"));

var _bunyanDebugStream = _interopRequireDefault(require("bunyan-debug-stream"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// we don't import the config here because we want to log early
const NODE_ENV = process.env.NODE_ENV || 'development'; // don't log for testing environment

const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'test' ? _bunyan.default.FATAL : _bunyan.default.INFO);
const logManager = {
  getLogger(name) {
    const logName = name || ' ';
    const streams = [];
    streams.push({
      level: logLevel,
      type: 'raw',
      stream: (0, _bunyanDebugStream.default)({
        colors: {
          info: 'white',
          debug: 'grey',
          error: ['red']
        },
        prefixers: {// add prefixers here
        },
        showDate: time => {
          return (0, _dateFns.format)(time, NODE_ENV === 'production' ? '' : 'HH:mm:ss.ms');
        },
        showPid: false
      })
    });

    const logger = _bunyan.default.createLogger({
      name: logName,
      streams
    });

    return logger;
  }

};
exports.logManager = logManager;
const log = logManager.getLogger('root');
exports.log = log;