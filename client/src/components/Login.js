import React from 'react'
import { AuthConsumer } from '../providers/AuthProvider'
import { Button, Form, Segment, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.auth.handleLogin({ email, password }, this.props.history)
  }


  render() {
    const { email, password } = this.state
    return (
      <Segment style={style.segment} >
        <Header as='h1' textAlign='center'>
          Login
        </Header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            autoFocus
            label='Email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={this.handleChange}
          />

          <Form.Input
            required
            autoFocus
            label='Password'
            name='password'
            placeholder='Password'
            value={password}
            type='password'
            onChange={this.handleChange}
          />

          <Segment basic style={{padding:'2% 0 0 0'}}>
            <Button primary inverted fluid>Submit</Button>
          </Segment>
        </Form>

        <Segment basic compact>
          <Link to='/register'>Don't have an account yet?</Link>
        </Segment>
      </Segment>
    )
  }
}

export default class ConnectLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

const style = {
  segment: {
    margin: '5% 20%',
  }
}