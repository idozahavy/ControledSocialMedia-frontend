import React, { useState } from "react"
import { Typography } from "@material-ui/core"

import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

function showError(text,phoneBool,passBool) {
    let error = document.querySelector('#errorText');
    let phoneCom = document.querySelector('#phone');
    let passCom = document.querySelector('#password');
    if (phoneBool)
        phoneCom.style.color = "red";
    if (passBool)
        passCom.style.color = "red";
    
    let errorHeight = error.style.height;
    if (!errorHeight)
        errorHeight = 15;
    else {
        error.innerHTML += "</br>";
        errorHeight += 10;
    }
    error.style.height = errorHeight+"px";
    error.innerHTML += text;
}

function clearError() {
    let error = document.querySelector('#errorText');
    error.style.height = "0px";
    error.innerHTML = "";
    document.querySelector('#password').style.color = "black";
    document.querySelector('#phone').style.color = "black";
}

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export const LogIn = () => {
  // const [user, setUser] = useState({name: "guest", credits: "0", isManager: 0})
  const [manager, setManager] = useState(false)
  const [phone,setPhone] = useState("");
  const [password,setpassword] = useState("");

  const SubmitLogInForm = (event) => {
    clearError();
    let flag = 0;
    if (phone.length!==10) {
      showError("Phone must be 10 digits long",1,0);
      flag = 1;
    }

    if (password.length<8) {
      showError("Password must be more than 8 letters long",0,1);
      flag = 1;
    }
    
    if (flag === 0) {
      axios.post("/login", { phone, password }).then(res => { 
        console.log(res);
        console.log(res.data);
        //logInUser();
      })
    } else {
      event.preventDefault();
    }
  }

  // const logInUser = () => {
  //   firebase.initializeApp({
  //     apiKey: 'AIzaSyDqTrxHD6dk-j1HegBNWbf3M3N7UZCVZB0',
  //     authDomain: 'youmadeit-37017.firebaseapp.com'
  //   });
    
  //   // As httpOnly cookies are to be used, do not persist any state client side.
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    
  //   // When the user signs in with email and password.
  //   firebase.auth().signInWithEmailAndPassword(phone, password).then(user => {
  //     // Get the user's ID token as it is needed to exchange for a session cookie.
  //     return user.getIdToken().then(idToken => {
  //       // Session login endpoint is queried and the session cookie is set.
  //       // CSRF protection should be taken into account.
  //       // ...
  //       const csrfToken = getCookie('csrfToken')
  //       return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
  //     });
  //   }).then(() => {
  //     // A page redirect would suffice as the persistence is set to NONE.
  //     return firebase.auth().signOut();
  //   }).then(() => {
  //     window.location.assign('/profile');
  //   });
  // }

  let classes = useStyles();
  
  return (
      <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.form}>
        <TextField variant="outlined" margin="normal" required fullWidth id="phone" label="Phone Number"
          name="phone" autoComplete="phone" autoFocus 
          onChange={e => (setPhone(e.target.value), clearError())}/>
        <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password"
          type="password" id="password" autoComplete="current-password" 
          onChange={e => (setpassword(e.target.value), clearError())}/>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <p id="errorText" style={{transition:"1s" , height:"0px", color:"red",display:"flexbox", padding:"0 0 0 0", margin:"5px 0 0 0", textAlign:"center"}}></p>
        <Link to="/">
          <Button onClick={SubmitLogInForm} fullWidth variant="contained" color="primary" 
            className={classes.submit}>
            Log In
          </Button>
        </Link>
        <Grid container>
          <Grid item xs>
            <Link to="/Need to fill this" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/SignUp" variant="body2">
              {"Don't have an account? Log Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  )
}