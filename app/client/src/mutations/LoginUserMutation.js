import {commitMutation, graphql} from 'react-relay';

import environment from '../environment';

const mutation = graphql`
  mutation LoginUserMutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      userEdge {
        cursor
        node {
          name
          id
        }
      }
      viewer {
        ...App_viewer
      }
    }
  }
`;

export default (name, viewer, callback) => commitMutation(environment, {
  mutation,
  variables: {
    input: {
      name
    }
  },
  onCompleted: (...args) => callback(...args),
  updater: (store) => {
    const mutationRoot = store.getRootField('loginUser');
    const newViewer = mutationRoot.getLinkedRecord('viewer');
    const clientRoot = store.getRoot();
    clientRoot.setLinkedRecord(newViewer, 'viewer');
  },
  onError: err => console.error(err),
});
