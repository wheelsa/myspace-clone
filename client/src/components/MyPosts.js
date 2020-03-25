import React, { Component } from 'react'
import axios from 'axios'
import {Card, Divider, Image } from 'semantic-ui-react'

export default class MyPosts extends Component {
  state = {posts: [] }

  componentDidMount(){
    axios.get('/api/posts')
    .then( res => this.setState({ posts: res.data}) )
  }

  render() {
    const {posts} = this.state
    return(
      <Card.Group itemsPerRow={1}>
        {posts.map( post =>
          <Card key={post.id}>
            <Card.Content>
              {post.body}
              <Divider />
              placeholder for replies
            </Card.Content>

          </Card>
          )}
      </Card.Group>
    )
  }
}