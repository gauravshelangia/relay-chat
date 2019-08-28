import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay';

import {MessageEdge} from '../types/Message'
import {UserType} from '../types/User'

const AddMessageMutation = mutationWithClientMutationId({
  name: 'AddMessage',
  inputFields: {
    clientMutationId: {type: GraphQLString},
    userId: {type: GraphQLString},
    username: {type: GraphQLString},
    text: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    messageEdge: {
      type: MessageEdge,
      resolve: (source, args, context, info) => ({
        cursor: cursorForObjectInConnection(context.getMessages(), source.message),
        node: source.message,
      }),
    },
    viewer: {type: UserType},
  },
  mutateAndGetPayload: (input, context, info) => {
    const userId = input.userId || context.viewer.id;
    const username = input.username || context.viewer.name;

    return {
      clientMutationId: input.clientMutationId,
      message: context.addMessage({
        ...input,
        userId,
        username,
      }),
      viewer: context.viewer,
    };
  },
});

export default AddMessageMutation
