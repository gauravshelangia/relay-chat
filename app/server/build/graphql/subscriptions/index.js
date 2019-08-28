'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _loginUser = require('./loginUser');

var _loginUser2 = _interopRequireDefault(_loginUser);

var _logoutUser = require('./logoutUser');

var _logoutUser2 = _interopRequireDefault(_logoutUser);

var _newMessage = require('./newMessage');

var _newMessage2 = _interopRequireDefault(_newMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = new _graphql.GraphQLObjectType({
  name: 'Subscription',
  fields: function fields() {
    return {
      loginUser: _loginUser2.default,
      logoutUser: _logoutUser2.default,
      newMessage: _newMessage2.default
    };
  }
});

exports.default = Subscription;