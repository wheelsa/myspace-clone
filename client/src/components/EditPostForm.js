import React, {useState} from 'react'
import { Header, Segment, Form, Button} from 'semantic-ui-react'
import axios from 'axios'

const EditPostForm = (props) => {
  const defaultValues = {    
    user_id: props.match.params.user_id,
    body: '',
    date: '',
  }
  
  const [post, setPost] = useState({...defaultValues})
  const {user} = props

  const handleChange = e => {
    const { name, value } = e.target
    setPost({
      [name]: value,
      date: new Date()
    })
  }

  const handleSubmit = e => {
  
    e.preventDefault()
    axios.put(`../../api/posts/${props.match.params.id}`, post).then(res => {
      setPost({ ...defaultValues });
    }).catch( (err) => {
      console.log(err.response)
    })
  }

  const getPost = () => {
    axios.get(`../../api/posts/${props.match.params.id}`).then(res=>
        setPost({
          body: res.data.body
        })
      )
  }


    if(post.body === ''){
      getPost()
    }
    return (
      <Segment style={{ margin: '0' }}>
        <Header as='h3'>Edit Post</Header>
        <div>
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
              <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </Segment>
    )
  
}

export default EditPostForm