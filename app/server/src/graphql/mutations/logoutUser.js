import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import {UserType} from '../types/User'

const LogoutUserMutation = mutationWithClientMutationId({
  name: 'LogoutUser',
  inputFields: {
    clientMutationId: {type: GraphQLString},
    id: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    user: {type: UserType},
    viewer: {type: UserType},
  },
  mutateAndGetPayload: (input, context, info) => {
    const user = context.logoutUser(input.id);
    return {
      clientMutationId: input.clientMutationId,
      user,
      viewer: context.viewer,
    }
  },
});

export default LogoutUserMutation
