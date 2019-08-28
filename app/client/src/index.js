import React from 'react';
import ReactDOM from 'react-dom';
import {graphql, QueryRenderer} from 'react-relay'

import App from './components/App';
import environment from './environment'

ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
      query src_App_Query {
        viewer {
          ...App_viewer
        }
      }
    `}
    render={({error, props}) => {
      if (error) {
        return <div>{error.message}</div>;
      } else if (props) {
        return <App {...props} />;
      }
      return <div>Loading</div>;
    }}
  />,
  document.getElementById('root'),
);
