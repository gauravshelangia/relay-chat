import {commitMutation, graphql} from 'react-relay';

import environment from '../environment';

const mutation = graphql`
  mutation AddMessageMutation($input: AddMessageInput!) {
    addMessage(input: $input) {
      messageEdge {
        cursor
        node {
          userId
          username
          text
          createdAt
        }
      }
    }
  }
`;

export default (input, callback) => commitMutation(environment, {
  mutation,
  variables: {input},
  onCompleted: () => callback(),
  onError: err => console.error(err),
});

