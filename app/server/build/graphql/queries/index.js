'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Node = require('../types/Node');

var _User = require('../types/User');

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: _User.UserType,
      resolve: function resolve(source, args, context, info) {
        return context.viewer;
      }
    },
    node: _Node.node
  }
});

exports.default = Query;