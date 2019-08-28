import {GraphQLObjectType} from 'graphql';

import {node} from '../types/Node'
import {UserType} from '../types/User'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: UserType,
      resolve: (source, args, context, info) => context.viewer,
    },
    node,
  },
});

export default Query;
