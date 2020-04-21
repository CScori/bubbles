import React from 'react'

import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if(localStorage.getItem('authkey')) {
        // user is auth
        return (
          <Component {...props} />
        )
      } else {
        // user not auth
        return <Redirect to='/' />
      }
    }} />
  )
}

export default PrivateRoute