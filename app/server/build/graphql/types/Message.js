'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageEdge = exports.MessagesConnection = exports.MessageType = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Node = require('./Node');

var MessageType = (0, _Node.registerType)(new _graphql.GraphQLObjectType({
  name: 'Message',
  interfaces: function interfaces() {
    return [_Node.NodeInterface];
  },
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Message'),
      userId: {
        type: _graphql.GraphQLString,
        resolve: function resolve(source) {
          return (0, _graphqlRelay.toGlobalId)('User', source.userId);
        }
      },
      username: { type: _graphql.GraphQLString },
      text: { type: _graphql.GraphQLString },
      createdAt: { type: _graphql.GraphQLString },
      updatedAt: { type: _graphql.GraphQLString }
    };
  }
}));

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Message',
  nodeType: MessageType
}),
    MessagesConnection = _connectionDefinition.connectionType,
    MessageEdge = _connectionDefinition.edgeType;

exports.MessageType = MessageType;
exports.MessagesConnection = MessagesConnection;
exports.MessageEdge = MessageEdge;