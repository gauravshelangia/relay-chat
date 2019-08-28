import {offsetToCursor} from 'graphql-relay';
import {subscriptionWithClientId} from 'graphql-relay-subscription';

import {UserType, UserEdge} from '../types/User';
import {LOGIN_USER_EVENT} from '../../context'

export default subscriptionWithClientId({
  name: 'LoginUserSubscription',
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: (source, args, context, info) => {
        const {clientSubscriptionId, ...user} = source;
        const users = context.getUsers();
        const offset = users.findIndex(m => m.id === user.id);
        return {
          cursor: offsetToCursor(offset),
          node: user,
        }
      },
    },
    viewer: {
      type: UserType,
      resolve: (source, args, context, info) => context.viewer,
    },
  },
  subscribe: (input, context) => context.subscribe(LOGIN_USER_EVENT),
});
