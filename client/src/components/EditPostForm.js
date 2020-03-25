import React from 'react'
import { Header, Segment, Form, Button} from 'semantic-ui-react'
import axios from 'axios'

class EditPostForm extends React.Component {
  defaultValues = {    
    user_id: this.props.match.params.user_id,
    body: '',
    date: '',
  }
  state = {...this.defaultValues}

  handleChange = e => {
    const { name, value } = e.target
    const  { user } = this.props
    this.setState({
      [name]: value,
      date: new Date()
    })
  }

  handleSubmit = e => {
    const post = {...this.state}
    e.preventDefault()
    axios.put(`../../api/posts/${this.props.match.params.id}`, post).then(res => {
      this.setState({ ...this.defaultValues });
    }).catch( (err) => {
      console.log(err.response)
    })
  }

  getPost(){
    axios.get(`../../api/posts/${this.props.match.params.id}`).then(res=>
        this.setState({
          body: res.data.body
        })
      )
  }

  render() {
    if(this.state.body === ''){
      this.getPost()
    }
    return (
      <Segment style={{ margin: '0' }}>
        <Header as='h3'>Edit Post</Header>
        <div>
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
              <Button onClick={this.handleSubmit}>Update</Button>
          </div>
        </div>
      </Segment>
    )
  }
}

export default EditPostForm