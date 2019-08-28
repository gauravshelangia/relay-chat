import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay'
import styled from 'styled-components';

const Container = styled.div`
	margin: 0 0 10px 0;
	color: #42526E;
	font-size: 16px;
	font-weight: bold;
`;

class User extends Component {
	render() {
		return (
			<Container title={this.props.user.id}>
				{this.props.user.name}
			</Container>
		);
	}
}

export default createFragmentContainer(User, graphql`
	fragment User_user on User {
		id
		name
	}
`);
