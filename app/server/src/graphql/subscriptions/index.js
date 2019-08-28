import {GraphQLObjectType} from 'graphql';

import loginUser from './loginUser';
import logoutUser from './logoutUser';
import newMessage from './newMessage';

const Subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    loginUser,
    logoutUser,
    newMessage,
  }),
});

export default Subscription
