import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <>
      <Header as='h3' textAlign='center'>
        Page Not Found
    </Header>
      <Header as='h3' textAlign='center'>
        <Link to='/'>
          <Button>Home</Button>
        </Link>
      </Header>
    </>
  )
}

export default NoMatch