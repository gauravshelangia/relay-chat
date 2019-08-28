'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Message = require('../types/Message');

var _User = require('../types/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddMessageMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddMessage',
  inputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    userId: { type: _graphql.GraphQLString },
    username: { type: _graphql.GraphQLString },
    text: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },
  outputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    messageEdge: {
      type: _Message.MessageEdge,
      resolve: function resolve(source, args, context, info) {
        return {
          cursor: (0, _graphqlRelay.cursorForObjectInConnection)(context.getMessages(), source.message),
          node: source.message
        };
      }
    },
    viewer: { type: _User.UserType }
  },
  mutateAndGetPayload: function mutateAndGetPayload(input, context, info) {
    var userId = input.userId || context.viewer.id;
    var username = input.username || context.viewer.name;

    return {
      clientMutationId: input.clientMutationId,
      message: context.addMessage((0, _extends3.default)({}, input, {
        userId: userId,
        username: username
      })),
      viewer: context.viewer
    };
  }
});

exports.default = AddMessageMutation;