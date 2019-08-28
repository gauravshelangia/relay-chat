import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import styled from 'styled-components';

import AddMessageMutation from '../mutations/AddMessageMutation';
import NewMessageSubscription from '../subscriptions/NewMessageSubscription';
import LoginUserSubscription from '../subscriptions/LoginUserSubscription';
import LogoutUserSubscription from '../subscriptions/LogoutUserSubscription';

import Message from './Message'
import User from './User'

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Users = styled.div`
  width: 235px;
  padding: 1em;
  background: #f4f5f7;
  border-right: 1px solid #ccc;
  overflow: auto;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 1em;
  overflow: auto;
`;

const AddMessage = styled.input.attrs({type: 'text'}) `
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 1.8em 0.6em;
  margin-right: 10px;
  font-size: 16px;
  border: 0;
  border-top: 1px solid #ccc;
  outline: none;
`;

class Chat extends Component {
  state = {
    message: '',
  }

  componentDidMount() {
    this.newMessageSubscription = NewMessageSubscription();
    this.loginUserSubscription = LoginUserSubscription();
    this.logoutUserSubscription = LogoutUserSubscription();

    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewer.messages.edges.length === prevProps.viewer.messages.edges.length + 1) {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.newMessageSubscription.dispose();
    this.loginUserSubscription.dispose();
    this.logoutUserSubscription.dispose();
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (this.state.message.length) {
        AddMessageMutation({text: this.state.message}, () => console.log('Added Message'));
        this.setState({message: ''});
      }
    }
  }

  render() {
    const {viewer} = this.props;
    const {messages, users} = viewer;

    return (
      <Container>
        <Users>
          {users.edges.map(({node: user}, i) => (
            <User key={user.id} user={user} viewer={viewer} />
          ))}
        </Users>
        <Messages>
          <MessageList innerRef={e => this.messageList = e}>
            {messages.edges.map(({node: message}, i) => (
              <Message
                key={message.id}
                message={message}
                viewer={viewer}
                first={message.userId !== ((messages.edges[i - 1] && messages.edges[i - 1].node && messages.edges[i - 1].node.userId) || null)}
                last={message.userId !== ((messages.edges[i + 1] && messages.edges[i + 1].node && messages.edges[i + 1].node.userId) || null)}
              />
            ))}
          </MessageList>
          <AddMessage
            name="message"
            value={this.state.message}
            placeholder="Type a message ..."
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </Messages>
      </Container>
    );
  }
}

export default createFragmentContainer(Chat, graphql`
  fragment Chat_viewer on User {
    id
    name
    ...Message_viewer
    users(first: 2147483647) @connection(key: "UsersLists_users") {
      edges {
        cursor
        node {
          id
          ...User_user
        }
      }
    }
    messages (first: 2147483647) @connection(key: "MessageList_messages") {
      edges {
        cursor
        node {
          id
          userId
          ...Message_message
        }
      }
    }
  }
`);
