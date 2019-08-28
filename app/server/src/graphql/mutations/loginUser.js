import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay';

import {UserType, UserEdge} from '../types/User';

const LoginUserMutation = mutationWithClientMutationId({
  name: 'LoginUser',
  inputFields: {
    clientMutationId: {type: GraphQLString},
    name: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    userEdge: {
      type: UserEdge,
      resolve: (source, args, context, info) => ({
        cursor: cursorForObjectInConnection(context.getUsers(), source.user),
        node: source.viewer,
      }),
    },
    viewer: {type: UserType},
  },
  mutateAndGetPayload: (input, context, info) => {
    const user = context.loginUser({name: input.name});
    return {
      clientMutationId: input.clientMutationId,
      user,
      viewer: context.viewer,
    }
  },
});

export default LoginUserMutation
