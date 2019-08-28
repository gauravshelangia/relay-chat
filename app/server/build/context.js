'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_MESSAGE_EVENT = exports.LOGOUT_USER_EVENT = exports.LOGIN_USER_EVENT = exports.DELETE_MESSAGE_EVENT = exports.ADD_MESSAGE_EVENT = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getNode = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(globalId) {
    var _fromGlobalId2, id, type, node;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fromGlobalId2 = (0, _graphqlRelay.fromGlobalId)(globalId), id = _fromGlobalId2.id, type = _fromGlobalId2.type;
            _context.next = 3;
            return this['get' + type](id);

          case 3:
            node = _context.sent;

            if (node) {
              node.__typename = type;
            }

            return _context.abrupt('return', node);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getNode(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Messages


var _graphqlRelay = require('graphql-relay');

var _graphqlSubscriptions = require('graphql-subscriptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADD_MESSAGE_EVENT = exports.ADD_MESSAGE_EVENT = 'ADD_MESSAGE_EVENT';
var DELETE_MESSAGE_EVENT = exports.DELETE_MESSAGE_EVENT = 'DELETE_MESSAGE_EVENT';
var LOGIN_USER_EVENT = exports.LOGIN_USER_EVENT = 'LOGIN_USER_EVENT';
var LOGOUT_USER_EVENT = exports.LOGOUT_USER_EVENT = 'LOGOUT_USER_EVENT';
var UPDATE_MESSAGE_EVENT = exports.UPDATE_MESSAGE_EVENT = 'UPDATE_MESSAGE_EVENT';

var GUEST_USER = { id: null, name: 'Guest' };

//
var messages = {};
var users = {};

var id = 0;
function nextId() {
  id++;
  return id;
}

//
function getId(anyId) {
  if (typeof anyId === 'undefined' || anyId === null || anyId === 'null' || anyId === '') {
    return null;
  }

  if (/^\d+$/.test(anyId)) {
    return Number(anyId);
  }

  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(anyId),
      type = _fromGlobalId.type,
      id = _fromGlobalId.id;

  if (type) {
    return id;
  }

  return Number(anyId);
}

function addMessage(payload) {
  if (!this.viewer.id) {
    return null;
  }

  var messageId = nextId();

  var now = new Date().toISOString();
  var message = {
    id: messageId,
    userId: payload.userId,
    username: payload.username,
    text: payload.text,
    createdAt: now,
    updatedAt: now
  };

  messages[messageId] = message;
  this.publish(ADD_MESSAGE_EVENT, message);

  return message;
}

function deleteMessage(rawMessageId) {
  if (!this.viewer.id) {
    return null;
  }

  var messageId = getId(rawMessageId);

  var message = messages[messageId];
  if (message) {
    delete messages[messageId];
    this.publish(DELETE_MESSAGE_EVENT, message);
    return message;
  }

  return null;
}

function updateMessage(rawMessageId, payload) {
  if (!this.viewer.id) {
    return null;
  }

  var messageId = getId(rawMessageId);

  var message = (0, _extends3.default)({}, messages[messageId], {
    text: payload.text,
    updatedAt: new Date().toISOString()
  });

  messages[messageId] = message;
  this.publish(UPDATE_MESSAGE_EVENT, message);

  return message;
}

function getMessage(rawMessageId) {
  if (!this.viewer.id) {
    return null;
  }

  var messageId = getId(rawMessageId);
  return messages[messageId] || null;
}

function getMessages() {
  if (!this.viewer.id) {
    return null;
  }

  return Object.keys(messages).map(function (k) {
    return messages[k];
  });
}

// Users
function loginUser(payload) {
  var userId = nextId();

  var now = new Date().toISOString();
  var user = {
    id: userId,
    name: payload.name,
    createdAt: now,
    updatedAt: now
  };

  this.viewer = user;

  users[userId] = user;
  this.publish(LOGIN_USER_EVENT, user);

  return user;
}

function logoutUser(rawUserId) {
  var userId = getId(rawUserId);

  this.viewer = GUEST_USER;

  var user = users[userId];
  if (user) {
    delete users[userId];
    this.publish(LOGOUT_USER_EVENT, user);
    return user;
  }

  return null;
}

function getGuest() {
  return GUEST_USER;
}

function getUser(rawUserId) {
  var userId = getId(rawUserId);
  return users[userId] || null;
}

function getUsers() {
  if (!this.viewer.id) {
    return null;
  }

  return Object.keys(users).map(function (k) {
    return users[k];
  });
}

function subscribe(event) {
  return this.pubSub.asyncIterator(event);
}

function publish(event, payload) {
  return this.pubSub.publish(event, payload);
}

exports.default = {
  viewer: GUEST_USER,
  getNode: getNode,
  getGuest: getGuest,
  getUser: getUser,
  getUsers: getUsers,
  loginUser: loginUser,
  logoutUser: logoutUser,
  getMessage: getMessage,
  getMessages: getMessages,
  addMessage: addMessage,
  deleteMessage: deleteMessage,
  updateMessage: updateMessage,
  pubSub: new _graphqlSubscriptions.PubSub(),
  subscribe: subscribe,
  publish: publish
};