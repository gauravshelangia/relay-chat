import {requestSubscription, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
import environment from '../environment';

const newMessageSubscription = graphql`
  subscription NewMessageSubscription ($input: NewMessageSubscriptionInput!) {
    newMessage(input: $input) {
      messageEdge {
        cursor
        node {
          id
          userId
          username
          text
          createdAt
          ...Message_message
        }
      }
      viewer {
        id
      }
    }
  }
`;

export default () => requestSubscription(environment, {
  subscription: newMessageSubscription,
  variables: {
    input: {}
  },
  updater: store => {
    const rootField = store.getRootField('newMessage');
    const edge = rootField.getLinkedRecord('messageEdge');
    const node = edge.getLinkedRecord('node');

    const viewer = store.getRoot().getLinkedRecord('viewer');
    const connection = ConnectionHandler.getConnection(viewer, 'MessageList_messages');
    const newEdge = ConnectionHandler.createEdge(store, connection, node, 'MessageEdge');
    ConnectionHandler.insertEdgeAfter(connection, newEdge);
  },
});
