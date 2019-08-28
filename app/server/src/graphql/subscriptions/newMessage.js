import {offsetToCursor} from 'graphql-relay';
import {subscriptionWithClientId} from 'graphql-relay-subscription';

import {MessageEdge} from '../types/Message';
import {UserType} from '../types/User'
import {ADD_MESSAGE_EVENT} from '../../context';

export default subscriptionWithClientId({
  name: 'NewMessageSubscription',
  outputFields: {
    messageEdge: {
      type: MessageEdge,
      resolve: (source, args, context, info) => {
        const {clientSubscriptionId, ...message} = source;
        const messages = context.getMessages();
        const offset = messages.findIndex(m => m.id === message.id);
        return {
          cursor: offsetToCursor(offset),
          node: message,
        }
      },
    },
    viewer: {
      type: UserType,
      resolve: (source, args, context, info) => context.viewer,
    },
  },
  subscribe: (input, context) => context.subscribe(ADD_MESSAGE_EVENT),
});
