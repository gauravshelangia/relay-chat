'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Message = require('../types/Message');

var _User = require('../types/User');

var DeleteMessageMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'DeleteMessage',
  inputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
  },
  outputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    message: { type: _Message.MessageType },
    viewer: { type: _User.UserType }
  },
  mutateAndGetPayload: function mutateAndGetPayload(input, context, info) {
    return {
      clientMutationId: input.clientMutationId,
      message: context.deleteMessage(input.id),
      viewer: context.viewer
    };
  }
});

exports.default = DeleteMessageMutation;