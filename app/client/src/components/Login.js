import React, {Component} from 'react';
import styled from 'styled-components';

import LoginUserMutation from '../mutations/LoginUserMutation';

const Container = styled.div`
  padding: 1.2em;

  & > h2 {
    margin: 0 0 0.5em 0;
  }

  & > input {
    width: 235px;
    padding: 10px;
    margin-right: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    outline: none;
  }
`;

class Login extends Component {
  state = {
    username: '',
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      LoginUserMutation(this.state.username, this.props.viewer, result => {
        const userId = result.loginUser.viewer.__id;
        localStorage.setItem('USER_ID', userId);
      });
    }
  }

  render() {
    return (
      <Container>
        <h2>Login</h2>
        <input
          type="text"
          autoComplete="off"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </Container>
    );
  }
}

export default Login;
