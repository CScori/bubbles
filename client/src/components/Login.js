import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import { makeStyles } from "@material-ui/core/styles";
import { Authios } from "../utils/Authios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    "& h1": {
      margin: 0,
      padding: 0,
      fontSize: 80
    }
  },
  loginBox: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    border: "solid 1px black",
    borderRadius: 3,
    padding: "3rem 5rem",
    "& div": {
      marginBottom: 12
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory()
  const [userinfo, setUserinfo] = useState({
    username: 'User',
    password: 'User'
  })

  const handleSubmit = e => {
    e.preventDefault()
    Authios()
      .post('/api/login', userinfo)
      .then(res => {
        // console.log(res)
        localStorage.setItem('authkey', JSON.stringify(res.data.payload))
        history.push('/bubbles')
      })
      .catch(err => console.log(`Error at login attempt`, err))
  }

  const handleChange = e => {
    setUserinfo({
      ...userinfo,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <div className={classes.root}>
      <h1>Bubbles</h1>
      <h5>Featuring PotionsJS</h5>
        <form>
      <div className={classes.loginBox}>
          <TextField name='username' label="Username" variant='outlined' value={userinfo.username} onChange={handleChange} />
          <br />
          <TextField name='password' label="Password" variant='outlined' value={userinfo.password} onChange={handleChange} />
          <br />
          <Button variant='contained' onClick={handleSubmit}>Login</Button>
      </div>
        </form>
    </div>
  );
};

export default Login;