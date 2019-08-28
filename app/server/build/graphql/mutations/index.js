'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _loginUser = require('./loginUser');

var _loginUser2 = _interopRequireDefault(_loginUser);

var _logoutUser = require('./logoutUser');

var _logoutUser2 = _interopRequireDefault(_logoutUser);

var _addMessage = require('./addMessage');

var _addMessage2 = _interopRequireDefault(_addMessage);

var _deleteMessage = require('./deleteMessage');

var _deleteMessage2 = _interopRequireDefault(_deleteMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    loginUser: _loginUser2.default,
    logoutUser: _logoutUser2.default,
    addMessage: _addMessage2.default,
    deleteMessage: _deleteMessage2.default
  }
});

exports.default = Mutation;