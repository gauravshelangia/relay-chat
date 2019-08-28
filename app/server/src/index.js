import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql'
import {execute, subscribe} from 'graphql';
import http from 'http'
import path from 'path';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import context from './context';
import schema from './graphql'

const app = express();
const server = http.createServer(app);
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: '*', credentials: true}));

app.use('*', (req, res, next) => {
  const userId = req.headers.authorization;
  const user = context.getUser(userId);
  const viewer = user || context.getGuest();

  const viewerContext = {
    ...context,
    viewer,
  }
  req.context = viewerContext;

  next();
});

app.use('/graphql', graphqlHTTP(async req => {
  const {context} = req;

  return ({
    schema,
    graphiql: true,
    rootValue: context.viewer,
    context,
  });
}));

// Live
if (process.env.NODE_ENV === 'live') {
  app.use((req, res, next) => express.static(path.join(__dirname, '../client'))(req, res, next));
}

server.listen(port, () => {
  SubscriptionServer.create({
    execute,
    subscribe,
    schema,
    onConnect: (connectionParams, webSocket) => {
      const userId = connectionParams.userId;
      const user = context.getUser(userId);
      const viewer = user || context.getGuest();

      const viewerContext = {
        ...context,
        viewer,
      };

      return viewerContext;
    },
  }, {server, path: '/subscriptions'});
});
