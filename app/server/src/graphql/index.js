import { GraphQLSchema } from 'graphql';

import query from './queries';
import mutation from './mutations';
import subscription from './subscriptions'

const Schema = new GraphQLSchema({
  query,
  mutation,
  subscription,
});

export default Schema;
