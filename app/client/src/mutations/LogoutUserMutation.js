import {commitMutation, graphql} from 'react-relay';

import environment from '../environment';

const mutation = graphql`
  mutation LogoutUserMutation($input: LogoutUserInput!) {
    logoutUser(input: $input) {
      viewer {
        ...App_viewer
      }
    }
  }
`;

export default (id, callback) => commitMutation(environment, {
  mutation,
  variables: {
    input: {
      id
    }
  },
  onCompleted: (...args) => callback(...args),
  updater: (store) => {
    const mutationRoot = store.getRootField('logoutUser');
    const newViewer = mutationRoot.getLinkedRecord('viewer');
    const clientRoot = store.getRoot();
    clientRoot.setLinkedRecord(newViewer, 'viewer');
  },
  onError: err => console.error(err),
});
