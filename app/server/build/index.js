'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphql = require('graphql');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _context2 = require('./context');

var _context3 = _interopRequireDefault(_context2);

var _graphql2 = require('./graphql');

var _graphql3 = _interopRequireDefault(_graphql2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var port = 4000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)({ origin: '*', credentials: true }));

app.use('*', function (req, res, next) {
  var userId = req.headers.authorization;
  var user = _context3.default.getUser(userId);
  var viewer = user || _context3.default.getGuest();

  var viewerContext = (0, _extends3.default)({}, _context3.default, {
    viewer: viewer
  });
  req.context = viewerContext;

  next();
});

app.use('/graphql', (0, _expressGraphql2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req) {
    var context;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context = req.context;
            return _context.abrupt('return', {
              schema: _graphql3.default,
              graphiql: true,
              rootValue: context.viewer,
              context: context
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()));

// Live
if (process.env.NODE_ENV === 'live') {
  app.use(function (req, res, next) {
    return _express2.default.static(_path2.default.join(__dirname, '../client'))(req, res, next);
  });
}

server.listen(port, function () {
  _subscriptionsTransportWs.SubscriptionServer.create({
    execute: _graphql.execute,
    subscribe: _graphql.subscribe,
    schema: _graphql3.default,
    onConnect: function onConnect(connectionParams, webSocket) {
      var userId = connectionParams.userId;
      var user = _context3.default.getUser(userId);
      var viewer = user || _context3.default.getGuest();

      var viewerContext = (0, _extends3.default)({}, _context3.default, {
        viewer: viewer
      });

      return viewerContext;
    }
  }, { server: server, path: '/subscriptions' });
});