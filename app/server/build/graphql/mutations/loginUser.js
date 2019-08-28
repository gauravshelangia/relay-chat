'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _User = require('../types/User');

var LoginUserMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'LoginUser',
  inputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },
  outputFields: {
    clientMutationId: { type: _graphql.GraphQLString },
    userEdge: {
      type: _User.UserEdge,
      resolve: function resolve(source, args, context, info) {
        return {
          cursor: (0, _graphqlRelay.cursorForObjectInConnection)(context.getUsers(), source.user),
          node: source.viewer
        };
      }
    },
    viewer: { type: _User.UserType }
  },
  mutateAndGetPayload: function mutateAndGetPayload(input, context, info) {
    var user = context.loginUser({ name: input.name });
    return {
      clientMutationId: input.clientMutationId,
      user: user,
      viewer: context.viewer
    };
  }
});

exports.default = LoginUserMutation;