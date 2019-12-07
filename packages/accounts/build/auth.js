"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRefreshToken = exports.createAccessToken = void 0;

var _jsonwebtoken = require("jsonwebtoken");

const createAccessToken = user => {
  (0, _jsonwebtoken.sign)({
    sub: user.id
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
};

exports.createAccessToken = createAccessToken;

const createRefreshToken = user => {
  (0, _jsonwebtoken.sign)({
    sub: user.id
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });
};

exports.createRefreshToken = createRefreshToken;