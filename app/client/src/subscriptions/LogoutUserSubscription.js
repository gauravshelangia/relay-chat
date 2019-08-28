import {requestSubscription, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';

import environment from '../environment';

const logoutUserSubscription = graphql`
  subscription LogoutUserSubscription ($input: LogoutUserSubscriptionInput!) {
    logoutUser(input: $input) {
      user {
        id
      }
      viewer {
        id
      }
    }
  }
`;

export default () => requestSubscription(environment, {
  subscription: logoutUserSubscription,
  variables: {input: {}},
  updater: store => {
    const rootField = store.getRootField('logoutUser');
    const user = rootField.getLinkedRecord('user');
    const deletedId = user.getValue('id');

    const viewer = store.getRoot().getLinkedRecord('viewer');
    const connection = ConnectionHandler.getConnection(viewer, 'UsersLists_users', []);
    ConnectionHandler.deleteNode(connection, deletedId)
  },
});
