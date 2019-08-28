'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

var _subscriptions = require('./subscriptions');

var _subscriptions2 = _interopRequireDefault(_subscriptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = new _graphql.GraphQLSchema({
  query: _queries2.default,
  mutation: _mutations2.default,
  subscription: _subscriptions2.default
});

exports.default = Schema;