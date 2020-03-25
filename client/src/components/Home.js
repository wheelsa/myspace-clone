import React from 'react'
import {Segment} from 'semantic-ui-react'
import { AuthConsumer } from '../providers/AuthProvider'
import PostForm from './PostForm'
import Axios from 'axios'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = { posts: [], users: [] }

  componentDidMount() {
    Axios.get(`api/posts`).then(res => this.setState({ posts: res.data })).catch(e => console.log(e))
    Axios.get('/users').then(res => this.setState({ users: res.data })).catch(e => console.log(e))
  }

  getUser = (id) => {
    const { users } = this.state
    return (
      users.filter(p => p.id === id)
    )
  }

  allPosts = () => {
    const { posts } = this.state
    var shA = shuffleArray(posts)
    var postStuff = ''
    if (posts.length > 0) {
      postStuff = posts.map((p) => {
        var userArray = this.getUser(p.user_id)
        var user = userArray[0]
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
            <h4>{p.body}</h4>
          </Segment>
        )
      })
    } else { return (postStuff = <h2> No Post</h2>) }
    return (postStuff)
  }

  render() {
    const { auth: { user } } = this.props
    return (
      <>
        <PostForm user={user} />
        <Segment>
          {this.allPosts()}
        </Segment>
      </>
    );
  }
}

const ConnectedHome = (props) => {
  return (
    <AuthConsumer>
      {auth =>
        <Home {...props} auth={auth} />
      }
    </AuthConsumer>
  )
}

//Randomize the order of the array.
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default ConnectedHome