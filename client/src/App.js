import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Container} from 'semantic-ui-react';
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register';
import FetchUser from './components/FetchUser'
import ShowUser from './components/ShowUser'
import ProtectedRoute from './components/ProtectedRoute'
import ShowOtherUser from './components/ShowOtherUser'
import Friends from './components/Friends'
import EditPostForm from './components/EditPostForm'

function App() {
  return (
    <>
      <NavBar />
        <FetchUser>
          <Container>
            <Switch>
              <ProtectedRoute exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/showUser' component={ShowUser} />
              <Route exact path='/users/:id' component={ShowOtherUser} />
              <Route exact path='/EditPostForm/:user_id/:id' component={EditPostForm} />
              <ProtectedRoute exact path='/friends' component={Friends}/>
              <Route component={NoMatch} />
            </Switch>
          </Container>
        </FetchUser>
    </>
  );
}



export default App;
