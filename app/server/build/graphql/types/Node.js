'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerType = exports.node = exports.NodeInterface = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphqlRelay = require('graphql-relay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = [];

var registerType = function registerType(type) {
  types[type.name] = type;
  return type;
};

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(globalId, context) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', context.getNode(globalId));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(), function (obj) {
  return types[obj.__typename];
}),
    NodeInterface = _nodeDefinitions.nodeInterface,
    node = _nodeDefinitions.nodeField;

exports.NodeInterface = NodeInterface;
exports.node = node;
exports.registerType = registerType;