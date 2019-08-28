import {GraphQLObjectType} from 'graphql';

import loginUser from './loginUser'
import logoutUser from './logoutUser'
import addMessage from './addMessage'
import deleteMessage from './deleteMessage'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    loginUser,
    logoutUser,
    addMessage,
    deleteMessage,
  },
});

export default Mutation;
