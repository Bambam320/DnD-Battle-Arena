//functional imports
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedUserContext } from './LoggedUserContext';

//material imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

function Login() {
  const defaultValues = {
    username: '',
    password: '',
    role: ''
  }
  const [freshestUserInfo, setFreshestUserInfo] = useState({
    username: '',
    role: ''
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);
  const { setCurrentUser } = useContext(LoggedUserContext);
  const [formValues, setFormValues] = useState(defaultValues);
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    let name = e.target.name === 'role' ? 'role' : e.target.name
    let value = e.target.name === 'role' ? e.target.checked === true ? e.target.value : null : e.target.value
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //gets the current users in the server and matches the login information, then calls a function per role
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/login`)
      .then((r) => r.json())
      .then((loginCredentials) => {
        let validCred = loginCredentials.find((loginCred) => (loginCred.username === formValues.username && (loginCred.password === formValues.password && (loginCred.role === formValues.role))))
        switch (true) {
          case validCred && validCred.role === 'professor': professorLogin(validCred) 
          break;
          case validCred && validCred.role === 'student': studentLogin(validCred)
          break;
          case validCred === undefined : falseLogin()
          break;
          default: return null
        }
      })
    setFormValues(defaultValues)
  };

  //from handleLoginSubmit: sets user context with current login info and navigates to professor page
  const professorLogin = (user) => {
    setSnackOpen(true)
    setCurrentUser(user)
    setFreshestUserInfo({
      "username": user.username,
      "role": user.role
    })
    setTimeout(navigateToFacultyPage, 5000)
  }

  function navigateToFacultyPage (role) {
    navigate("/faculty")
  }

  //from handleLoginSubmit: sets user context with current login info and navigates to student page
  const studentLogin = (user) => {
    setSnackOpen(true)
    setCurrentUser(user)
    setFreshestUserInfo({
      "username": user.username,
      "role": user.role
    })
    setTimeout(navigateToStudentPage, 5000)
  }

  function navigateToStudentPage() {
    navigate('/student')
  }

  function falseLogin() {

    setErrorSnackOpen(true)
  }

  //from snackbar component: snack closer
  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  const handleErrorSnackClose = () => {
    setErrorSnackOpen(false)
  }

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <Grid container style={{ marginTop: '100px' }} alignItems="center" justify="center" direction="column"><strong>Login Form</strong>
          <Grid item>
            <TextField
              id="username-input"
              name="username"
              label="User Name"
              type="text"
              value={formValues.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-password-input"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item style={{ marginTop: '15px' }}>
            <FormControl>
              <FormLabel style={{ marginLeft: '80px' }}>Role</FormLabel>
              <RadioGroup
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  key="Professor"
                  value="professor"
                  control={<Radio size="small" />}
                  label="Professor"
                />
                <FormControlLabel
                  key="Student"
                  value="student"
                  control={<Radio size="small" />}
                  label="Student"
                />
              </RadioGroup>
            </FormControl>
          </Grid >
          <Grid style={{ marginTop: '15px' }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid >
        </Grid>
      </form>
      <Container style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link
          underline="hover"
          to="/signup"
        >Not a member yet? Sign Up Here
        </Link>
      </Container>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message={`Login Successful ${freshestUserInfo.role === 'student' ? 'Pupil' : 'Professor'}, ${freshestUserInfo.username}. You will be redirected to your course material page, shortly.`}
      />
      <Snackbar
        open={errorSnackOpen}
        autoHideDuration={4000}
        onClose={handleErrorSnackClose}
        message={`Your credentials did not match a current user. NO SOUP FOR YOU!`}
      />
    </>
  );
}

export default Login;