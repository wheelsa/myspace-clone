import React, { Component } from 'react';
import axios from 'axios'
import {Card, Header } from 'semantic-ui-react'

export default class AllUsers extends Component {
state = {
  friends: []
}

componentDidMount(){
  axios.get('api/friends').then(res => {
    this.setState({
      friends: res.data
    });
  }).catch(err => {
    console.log(err)
  }
  )
}
currentFriends(){
  const { friends } = this.state
  if(friends.length > 0){
    return (
    <>
      {friends.map(friend => (
        <Card>
          <Card.Content>
            <Card.Header>{friend.nickname}</Card.Header>
            <Card.Meta>placeholder for link to friend's posts</Card.Meta>
          </Card.Content>
          <Card.Content>delete button placeholder</Card.Content>
        </Card>
      ))}
    </>
    )} else {
      return (
    <Header as="h3">No friends to show. Go make some friends</Header>)
  }
}

render(){
  return (
    <>
    {this.currentFriends()}
    </>
  );
}
}