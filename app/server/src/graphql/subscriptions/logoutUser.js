import {subscriptionWithClientId} from 'graphql-relay-subscription';

import {UserType} from '../types/User';
import {LOGOUT_USER_EVENT} from '../../context'

export default subscriptionWithClientId({
  name: 'LogoutUserSubscription',
  outputFields: {
    user: {
      type: UserType,
      resolve: (source, args, context, info) => {
        const {clientSubscriptionId, ...user} = source;
        return user;
      },
    },
    viewer: {
      type: UserType,
      resolve: (source, args, context, info) => context.viewer,
    },
  },
  subscribe: (input, context) => context.subscribe(LOGOUT_USER_EVENT),
});
