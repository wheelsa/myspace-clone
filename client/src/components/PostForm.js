import React from 'react'
import { Header, Segment,Form, Button } from 'semantic-ui-react'
import Avatar from 'react-avatar';
import axios from 'axios';

class PostForm extends React.Component {
  defaultValues = {user_id: 0,body: '',date: ''}
  state = {...this.defaultValues}

  handleChange = e => {
    const { name, value } = e.target
    const  { user } = this.props
    this.setState({
      [name]: value,
      user_id: user.id,
      date: new Date()
    })
  }

  handleSubmit = e => {
    const post = {...this.state}
    e.preventDefault()
    axios.post("/api/posts", post).then(res => {
      this.setState({ ...this.defaultValues });
    }).catch( (err) => {
      console.log(err.response)
    })
  }

  render() {
    const {user} = this.props
    return (
      <Segment style={{ margin: '0' }}>
        <Header as='h3'>Create A Post</Header>
        <div>
          <div style={{ display: 'inline-block', width: '5%' }}>
            <Avatar round size='35px' name={`${user.nickname}`} />
          </div>
          <div style={{ margin: '0', padding: '0 0 0 1%', display: 'inline-block', width: '85%' }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                placeholder='Write Your Post Here...'
                fluid
                name='body'
                value={this.state.body}
                onChange={this.handleChange}
              />
            </Form>
          </div>
          <div style={{display:'inline-block', width:'8%', marginLeft:'2%'}}>
              <Button to='/showUser' onClick={this.handleSubmit}>Post</Button>
          </div>
        </div>
      </Segment>
    )
  }
}

export default PostForm