import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Card, Divider, Image } from 'semantic-ui-react'

const MyPosts = (props) =>  {
  const [posts, setPost] = useState('');

  useEffect(() => {
    axios.get('/api/posts')
    .then( res => setPost({ posts: res.data}) )
  }, []
  )

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

export default MyPosts