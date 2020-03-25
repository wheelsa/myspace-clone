import React,{useState} from 'react'
import { Header, Segment,Form, Button } from 'semantic-ui-react'
import Avatar from 'react-avatar';
import axios from 'axios';

const PostForm = (props) => {
  const defaultValues = {body: '', user_id: 0,date: ''}

  const [post, setPost] = useState({...defaultValues})
  
  const {user} = props

  const handleChange = e => {
    const { name, value } = e.target

    setPost({
      [name]: value,
      user_id: user.id,
      date: new Date()
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post("/api/posts", post).then(res => {
      setPost({ ...defaultValues });
    }).catch( (err) => {
      console.log(err.response)
    })
  }

    return (
      <Segment style={{ margin: '0' }}>
        <Header as='h3'>Create A Post</Header>
        <div>
          <div style={{ display: 'inline-block', width: '5%' }}>
            <Avatar round size='35px' name={`${user.nickname}`} />
          </div>
          <div style={{ margin: '0', padding: '0 0 0 1%', display: 'inline-block', width: '85%' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                placeholder='Write Your Post Here...'
                fluid
                name='body'
                value={post.body}
                onChange={handleChange}
              />
            </Form>
          </div>
          <div style={{display:'inline-block', width:'8%', marginLeft:'2%'}}>
              <Button to='/showUser' onClick={handleSubmit}>Post</Button>
          </div>
        </div>
      </Segment>
    )
  }


export default PostForm