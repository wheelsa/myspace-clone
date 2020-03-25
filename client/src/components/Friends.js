import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Card, Header } from 'semantic-ui-react'

 const AllUsers = (props) => {
   
      const [friends, setFriends] = useState([])

      // state = {
      //   friends: []
      // }


  useEffect( () => {
    axios.get('api/friends').then(res => {
      setFriends( res.data
      ); 
    }).catch(err => {
      console.log(err)
    })}, [])
  
  const currentFriends = () => {
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

  return (
    <>
    {currentFriends()}
    </>
  );

}

export default AllUsers