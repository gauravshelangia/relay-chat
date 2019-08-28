import {requestSubscription, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';

import environment from '../environment';

const loginUserSubscription = graphql`
  subscription LoginUserSubscription ($input: LoginUserSubscriptionInput!) {
    loginUser(input: $input) {
      userEdge {
        cursor
        node {
          id
          name
          createdAt
          updatedAt
        }
      }
      viewer {
        id
      }
    }
  }
`;

export default () => requestSubscription(environment, {
  subscription: loginUserSubscription,
  variables: {input: {}},
  updater: store => {
    const rootField = store.getRootField('loginUser');
    const edge = rootField.getLinkedRecord('userEdge');
    const node = edge.getLinkedRecord('node');

    const viewer = store.getRoot().getLinkedRecord('viewer');
    const connection = ConnectionHandler.getConnection(viewer, 'UsersLists_users');
    const newEdge = ConnectionHandler.createEdge(store, connection, node, 'UserEdge');
    ConnectionHandler.insertEdgeAfter(connection, newEdge);
  },
});
