'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _graphqlRelay = require('graphql-relay');

var _graphqlRelaySubscription = require('graphql-relay-subscription');

var _Message = require('../types/Message');

var _User = require('../types/User');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelaySubscription.subscriptionWithClientId)({
  name: 'NewMessageSubscription',
  outputFields: {
    messageEdge: {
      type: _Message.MessageEdge,
      resolve: function resolve(source, args, context, info) {
        var clientSubscriptionId = source.clientSubscriptionId,
            message = (0, _objectWithoutProperties3.default)(source, ['clientSubscriptionId']);

        var messages = context.getMessages();
        var offset = messages.findIndex(function (m) {
          return m.id === message.id;
        });
        return {
          cursor: (0, _graphqlRelay.offsetToCursor)(offset),
          node: message
        };
      }
    },
    viewer: {
      type: _User.UserType,
      resolve: function resolve(source, args, context, info) {
        return context.viewer;
      }
    }
  },
  subscribe: function subscribe(input, context) {
    return context.subscribe(_context.ADD_MESSAGE_EVENT);
  }
});