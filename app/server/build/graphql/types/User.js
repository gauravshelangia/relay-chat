'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersConnection = exports.UserType = exports.UserEdge = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Message = require('./Message');

var _Node = require('./Node');

var UserType = (0, _Node.registerType)(new _graphql.GraphQLObjectType({
  name: 'User',
  description: "A Chat User",
  interfaces: function interfaces() {
    return [_Node.NodeInterface];
  },
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('User'),
      name: { type: _graphql.GraphQLString },
      createdAt: { type: _graphql.GraphQLString },
      updatedAt: { type: _graphql.GraphQLString },
      messages: {
        type: _Message.MessagesConnection,
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(source, args, context, info) {
          return (0, _graphqlRelay.connectionFromArray)(context.getMessages(), args);
        }
      },
      users: {
        type: UsersConnection,
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(source, args, context, info) {
          return (0, _graphqlRelay.connectionFromArray)(context.getUsers(), args);
        }
      }
    };
  }
}));

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
  name: 'User',
  nodeType: UserType
}),
    UsersConnection = _connectionDefinition.connectionType,
    UserEdge = _connectionDefinition.edgeType;

exports.UserEdge = UserEdge;
exports.UserType = UserType;
exports.UsersConnection = UsersConnection;