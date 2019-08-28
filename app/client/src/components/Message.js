import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay'
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 0 ${props => props.last ? 15 : 2}px 0;
  text-align: ${props => props.isMe ? 'right' : 'left'};
`;

const User = styled.div`
  display: ${props => props.first && !props.isMe ? 'block' : 'none'};
  margin: ${props => props.isMe ? '0 10px 5px 0' : '0 0 5px 10px'};
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
`;

const Text = styled.div`
  display: inline-block;
  margin: 0;
  padding: 10px;
  border-top-left-radius: ${props => props.isMe || props.first || (props.first && props.last) ? 20 : 5}px;
  border-top-right-radius: ${props => !props.isMe || props.first || (props.first && props.last) ? 20 : 5}px;
  border-bottom-left-radius: ${props => props.isMe || props.last || (props.first && props.last) ? 20 : 5}px;
  border-bottom-right-radius: ${props => !props.isMe || props.last || (props.first && props.last) ? 20 : 5}px;
  color: ${props => props.isMe ? '#fff' : '#000'};
  background: ${props => props.isMe ? '#0065ff' : '#ebecf0'};
`;

const Time = styled.div`
  display: ${props => props.last ? 'block' : 'none'};
  color: #ccc;
  margin: ${props => props.isMe ? '5px 10px 0 0' : '5px 0 0 10px'};
  font-size: 12px;
  font-style: normal;
`;

class Message extends Component {
  render() {
    const {first, last, message, viewer} = this.props;

    const props = {first, last, isMe: message.userId === viewer.id};

    const createdAt = new Date(message.createdAt);
    const minutes = createdAt.getMinutes();
    const formattedCreatedAt = `${createdAt.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;

    return (
      <Container {...props}>
        <User {...props}>{message.username}</User>
        <Text {...props}>{message.text}</Text>
        <Time {...props}>{formattedCreatedAt}</Time>
      </Container>
    );
  }
}

export default createFragmentContainer(Message, {
  message: graphql`
    fragment Message_message on Message {
      id
      userId
      username
      text
      createdAt
    }
  `,
  viewer: graphql`
    fragment Message_viewer on User {
      id
    }
  `,
});
