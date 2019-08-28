import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  connectionArgs,
  globalIdField,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';

import {MessagesConnection} from './Message'
import {NodeInterface, registerType} from './Node';

const UserType = registerType(new GraphQLObjectType({
  name: 'User',
  description: "A Chat User",
  interfaces: () => [NodeInterface],
  fields: () => ({
    id: globalIdField('User'),
    name: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    messages: {
      type: MessagesConnection,
      args: connectionArgs,
      resolve: (source, args, context, info) => connectionFromArray(context.getMessages(), args),
    },
    users: {
      type: UsersConnection,
      args: connectionArgs,
      resolve: (source, args, context, info) => connectionFromArray(context.getUsers(), args),
    },
  }),
}));

const {
  connectionType: UsersConnection,
  edgeType: UserEdge,
} = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

export {
  UserEdge,
  UserType,
  UsersConnection,
}
