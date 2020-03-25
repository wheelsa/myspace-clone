import React from "react";
import { Image, Header, Item, Segment, Input } from "semantic-ui-react";
import Axios from "axios";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

class ShowOtherUser extends React.Component {
  state = {
    user_id: this.props.match.params.id,
    user: null,
    allPost: [],
  }

  getUser = () => {
    const { user_id } = this.state;
    Axios.get(`${user_id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(e => console.log(e));
  };

  getAllPost = () => {
    Axios.get(`api/posts`).then(res => {
      this.setState({ allPost: res.data })
    })

      .catch(e => console.log(e))
  }

  getUsersPost = () => {
    const { allPost,user } = this.state
    var postStuff = ''
    if (allPost.length === 0) {
      return (<>{this.getAllPost()}</>)
    }
    else if (allPost.length !== 0) {
      postStuff = allPost.map((p) => {
        if (p.user_id === user.id) {
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
        }
      });
    } else {
      return (postStuff = (
        <Header as="h3" textAlign="center">
          {" "}
          No Post Exist Yet
        </Header>
      ));
    }
    return postStuff
  }

  getUserPostNumber = () => {
    const {allPost, user_id} = this.state
    var numberOfPost = 0
    if(allPost !== 0){
      allPost.map((p)=> {
        if(p.user_id === parseInt(user_id)){
          return numberOfPost +=1
        }
      })
    }
    return numberOfPost
  }

  render() {
    const { user} = this.state
    var userPostLength = this.getUserPostNumber()
    if (user !== null) {
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

          <Segment>
            {this.getUsersPost()}
          </Segment>
        </>
      );
    }
    else { return (<>{this.getUser()}</>) }
  }
}

export default ShowOtherUser
