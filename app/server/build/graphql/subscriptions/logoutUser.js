'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _graphqlRelaySubscription = require('graphql-relay-subscription');

var _User = require('../types/User');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelaySubscription.subscriptionWithClientId)({
  name: 'LogoutUserSubscription',
  outputFields: {
    user: {
      type: _User.UserType,
      resolve: function resolve(source, args, context, info) {
        var clientSubscriptionId = source.clientSubscriptionId,
            user = (0, _objectWithoutProperties3.default)(source, ['clientSubscriptionId']);

        return user;
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
    return context.subscribe(_context.LOGOUT_USER_EVENT);
  }
});