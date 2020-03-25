import React from 'react'
import { AuthConsumer } from '../providers/AuthProvider'
import { Header, Item, Segment, Button } from 'semantic-ui-react'
import Axios from 'axios'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import PostForm from './PostForm'

class ShowUser extends React.Component {
  state = { allPost: [], userPost: [] }
  deletePost = (id) => {
    Axios.delete(`api/posts/${id}`).catch(e => console.log(e))
  }

  getAllPost = () => {
    const { user_id } = this.state
    Axios.get(`api/posts`).then(res => {
      this.setState({ allPost: res.data })
    }).catch(e => console.log(e))
  }

  getUserPostNumber = (id) => {
    const { allPost, user_id } = this.state
    var numberOfPost = 0
    if (allPost !== 0) {
      allPost.map((p) => {
        if (p.user_id === parseInt(id)) {
          return numberOfPost += 1
        }
      })
    }
    return numberOfPost
  }

  getUsersPost = () => {
    const { allPost } = this.state
    const { auth: { user } } = this.props
    var postStuff = ''
    if (allPost.length === 0) {
      return (<>{this.getAllPost()}</>)
    }
    else if (allPost.length !== 0) {
      var newPostStuff = allPost.filter((p) => p.user_id === user.id)
      if (newPostStuff.length === 0) {
        return (postStuff = <Header as='h3' textAlign='center'> No Post Exist Yet</Header>)
      }
      else {
        postStuff = newPostStuff.map((p) => {
          return (
            <Segment key={`post-${p.id}`}>
              <div>
                <Link to={`/users/${p.user_id}`} style={{ color: 'black' }}>
                  <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    <Avatar round size='35px' name={`${user.nickname}`} />
                  </div>
                  <div style={{ margin: '0', padding: '0 0 0 1%', display: 'inline-block' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{user.nickname.charAt(0).toUpperCase()}{user.nickname.slice(1)} </div>
                    <div style={{ color: '#999', fontSize: '12px' }}>{p.date}</div>
                  </div>
                </Link>
              </div>
              <div style={{ marginBottom: '3%', marginTop: '3%' }}>
                <div style={{ display: 'inline-block' }}>
                  <h4>{p.body}</h4>
                </div>
                <div style={{ display: 'inline-block', float: 'right' }}>
                  <Link to={`/EditPostForm/${user.id}/${p.id}`}>
                    <Button inverted color="green" >Edit</Button>
                  </Link>
                  <Button inverted color="red" onClick={() => { this.deletePost(p.id) }}>Delete</Button>
                </div>
              </div>
            </Segment>
          )
        })
      }
    }
    else {
      return (postStuff = <Header as='h3' textAlign='center'> No Post Exist Yet</Header>)
    }
    console.log(newPostStuff.length)
    return postStuff
  }

  render() {
    const { auth: { user } } = this.props;
    var userPostLength = this.getUserPostNumber(user.id)
    return (
      <>
        <Segment>
          <Item.Group>
            <Item>
              <Avatar round size='150px' name={`${user.nickname}`} style={{ margin: '0 1% 0 0' }} />
              <Item.Content>
                <Item.Header as='h1' style={{ margin: '1% 0' }}>{user.nickname.charAt(0).toUpperCase()}{user.nickname.slice(1)}</Item.Header>
                <Item.Meta>More About {user.nickname.charAt(0).toUpperCase()}{user.nickname.slice(1)}</Item.Meta>
                <Item.Description>
                  <p>Email:   {user.email}</p>
                  <p>Friends:  0</p>
                  <p>Number of Post: {`${userPostLength}`}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <PostForm user={user} />
        <Segment>
          {this.getUsersPost()}
        </Segment>
      </>
    )
  }
}

export class ConnectedShowUser extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth =>
          <ShowUser {...this.props} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default ConnectedShowUser