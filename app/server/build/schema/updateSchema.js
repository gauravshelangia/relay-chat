#!/usr/bin/env babel-node --optional es7.asyncFunctions
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphql2 = require('../graphql');

var _graphql3 = _interopRequireDefault(_graphql2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Save JSON of full schema introspection for Babel Relay Plugin to use
(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var result;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _graphql.graphql)(_graphql3.default, _utilities.introspectionQuery);

        case 2:
          result = _context.sent;

          if (result.errors) {
            console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
          } else {
            _fs2.default.writeFileSync(_path2.default.join(__dirname, 'schema.json'), JSON.stringify(result, null, 2));
          }

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();

// Save user readable type system shorthand of schema
_fs2.default.writeFileSync(_path2.default.join(__dirname, 'schema.graphql'), (0, _utilities.printSchema)(_graphql3.default));