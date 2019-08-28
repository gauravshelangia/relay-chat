import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import {MessageType} from '../types/Message'
import {UserType} from '../types/User'

const DeleteMessageMutation = mutationWithClientMutationId({
  name: 'DeleteMessage',
  inputFields: {
    clientMutationId: {type: GraphQLString},
    id: {type: new GraphQLNonNull(GraphQLInt)},
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    message: {type: MessageType},
    viewer: {type: UserType},
  },
  mutateAndGetPayload: (input, context, info) => ({
    clientMutationId: input.clientMutationId,
    message: context.deleteMessage(input.id),
    viewer: context.viewer,
  }),
});

export default DeleteMessageMutation
