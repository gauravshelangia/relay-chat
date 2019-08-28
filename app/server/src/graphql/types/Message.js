import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  connectionDefinitions,
  globalIdField,
  toGlobalId,
} from 'graphql-relay';

import {NodeInterface, registerType} from './Node';

const MessageType = registerType(new GraphQLObjectType({
  name: 'Message',
  interfaces: () => [NodeInterface],
  fields: () => ({
    id: globalIdField('Message'),
    userId: {
      type: GraphQLString,
      resolve: source => toGlobalId('User', source.userId),
    },
    username: {type: GraphQLString},
    text: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  }),
}));

const {
  connectionType: MessagesConnection,
  edgeType: MessageEdge,
} = connectionDefinitions({
  name: 'Message',
  nodeType: MessageType,
});

export {
  MessageType,
  MessagesConnection,
  MessageEdge,
}
