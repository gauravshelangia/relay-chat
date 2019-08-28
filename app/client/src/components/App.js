import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import styled from 'styled-components';

import Chat from './Chat';
import Login from './Login';
import LogoutUserMutation from '../mutations/LogoutUserMutation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2em;
  color: white;
  background: #0747A6;

  & > h3 {
    margin: 0;
    font-size: 1.8em;
  }

  & > a {
    color: white;
  }
`;

class App extends Component {
  handleLogout = e => {
    e.preventDefault();

    LogoutUserMutation(this.props.viewer.id, (result) => {
      localStorage.removeItem('USER_ID');
    });
  }

  render() {
    const {viewer} = this.props;
    const isLoggedIn = viewer.name !== 'Guest';

    return (
      <Container>
        <Header>
          <h3>Relay Chat</h3>
          {isLoggedIn && <a href="#logout" onClick={this.handleLogout}>Logout</a>}
        </Header>
        {isLoggedIn
          ? <Chat viewer={viewer} />
          : <Login viewer={viewer} />
        }
      </Container>
    );
  }
}

export default createFragmentContainer(App, graphql`
  fragment App_viewer on User {
    id
    name
    ...Chat_viewer
  }
`);
