'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _User = require('../types/User');

var LogoutUserMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'LogoutUser',
  inputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
  },
  outputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    user: { type: _User.UserType },
    viewer: { type: _User.UserType }
  },
  mutateAndGetPayload: function mutateAndGetPayload(input, context, info) {
    var user = context.logoutUser(input.id);
    return {
      clientMutationId: input.clientMutationId,
      user: user,
      viewer: context.viewer
    };
  }
});

exports.default = LogoutUserMutation;