//functional imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//material imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';

//Dialog transition component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Signup () {
  //default values for assigning to form state as needed
  const defaultValues = {
    username: '',
    password: '',
    passwordAuth: '',
    role: ''
  }

  //assigning state for the form, dialog handler, snack handler, userinfo from submit
  const [formValues, setFormValues] = useState(defaultValues)
  const [openDialog, setOpenDialog] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [freshestUserInfo, setFreshestUserInfo] = useState({
    username: '',
    role: ''
  });

  //assigning the navigate hook for use
  const navigate = useNavigate()

  //form input change handler
  const handleInputChange = (e) => {
    let name = e.target.name === 'role' ? 'role' : e.target.name
    let value = e.target.name === 'role' ? e.target.checked === true ? e.target.value : null : e.target.value
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //post user login info to server if valid, dialog open if invalid
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const post = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formValues)
    }
    if (formValues.password === formValues.passwordAuth && formValues.password !== '') {
      fetch(`http://localhost:3001/login`, post)
        .then((r) => r.json())
        .then((data) => (data))
      return cleanUpForm(formValues.username, formValues.role)
    } else if (formValues.password !== formValues.passwordAuth) {
      return handleDialog()
    } else return null
  };

  //from handleSignupSubmit: dialog state logic opener
  const handleDialog = () => {
    setOpenDialog(true)
  }

  //from Dialog component: dialog state logic closer
  const handleDialogClose = () => {
    console.log('i want to close this')
    setOpenDialog(false);
  };

  //valid submit snack opener, local userinfo state, form clearer, navigate function
  const cleanUpForm = (username, role) => {  
    setSnackOpen(true)  
    setFreshestUserInfo({
      "username": username,
      "role": role
    })
    setFormValues(defaultValues)
    setTimeout(navigateToLogin, 5000);
  }

  //from cleanUpForm: navigate to login
  function navigateToLogin () {
    navigate("/login")
  }

  //from snackbar component: snack closer
  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  return (
    <>
      {/* User info input form */}
      <Container style={{ marginTop: '100px' }}>
        <form onSubmit={handleSignupSubmit}>
          <Grid container  style={{marginTop: '40px'}} alignItems="center" justify="center" direction="column">
            <strong>Sign Up Form</strong>
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
            <Grid item>
              <TextField
                id="outlined-password-input-Auth"
                name="passwordAuth"
                label="Re-enter Password"
                type="password"
                autoComplete="current-password"
                value={formValues.passwordAuth}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item style={{marginTop: '15px'}}>
              <FormControl>
                <FormLabel style={{marginLeft: '80px'}}>Role</FormLabel>
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
            <Grid style={{marginTop: '15px'}}>
              <Button variant="contained" color="primary" type="submit">
              Submit
              </Button>
            </Grid >
          </Grid>
        </form>
        {/* Dialog for incorrect password */}
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"The passwords you entered do not match!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Re-enter your passwords and try again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Acknowlegde</Button>
          </DialogActions>
        </Dialog>
        {/* valid signup message */}
        <Snackbar
          open={snackOpen}
          autoHideDuration={4500}
          onClose={handleSnackClose}
          message={`Thank you for signing up, ${freshestUserInfo.username}. Enjoy ${freshestUserInfo.role === 'student' ? 'learning' : 'teaching'}! You will be redirected to the login page, shortly.`}
        />
      </Container>
    </> 
  )
}

export default Signup;