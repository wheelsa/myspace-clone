import React, { Component } from 'react';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Form, Segment, Header } from 'semantic-ui-react'

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '', nickname: '', image: "/static/media/photo.9acfe78b.png" };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation, nickname, image } = this.state;
    const { auth: { handleRegister }, history } = this.props

    if (password === passwordConfirmation)
      handleRegister({ email, password, nickname, image }, history);
    else
      alert("Passwords don't match")
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, passwordConfirmation, nickname } = this.state;
    return (
      <Segment style={style.segment}>
        <Header as="h1" textAlign="center">
          Register
      </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Username"
            required
            autoFocus
            name="nickname"
            value={nickname}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            required
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Password Confirmation"
            type="password"
            onChange={this.handleChange}
          />
          <Segment basic style={{ padding: '2% 0 2% 0' }}>
            <Button primary inverted fluid>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default class ConnectedRegister extends Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

const style = {
  segment: {
    margin: '5% 20%',
  }
}