// functional imports
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { LoggedContext } from "./LoggedContext";

// material ui imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';


function CreateACharacter() {
  const { characters, setCharacters } = useContext(LoggedContext)
  const defaultValues = {
    name: "",
    pet: "",
    level: "",
    city: "",
    avatar_url: "",
    language: "",
    spells: []
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  //
  // a post request to active record with the formValues for the new character returns the new character from the database and adds to curernt state for characters
  function handleSubmit(e) {
    e.preventDefault();
    const server = 'http://localhost:9292/characters'
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues)
    }
    fetch(server, post)
      .then((r) => r.json())
      .then((returnedCharacter) => {
        setCharacters([...characters, returnedCharacter])
        setFormValues(defaultValues)
        setTimeout(navigate('/characters'), 2000)
      });
  };

  return (
    <Container style={{ marginTop: '-600px' }}>
      <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '-40px', marginBottom: '75px', color: '#ea2424', textShadow: '3px 3px 5px #000000' }}>
        The training guild will provide your new character with weapons and training. First: Fill in your characters information and click submit. Second: Add your character as your champion in the characters page. Third: Go to the spells page and add spells to your champion.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} >
          <Grid item xs={4}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="pet"
              name="pet"
              label="Pet"
              type="text"
              value={formValues.pet}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="level"
              name="level"
              label="Level"
              type="text"
              value={formValues.level}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="city"
              name="city"
              label="City"
              type="text"
              value={formValues.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="avatar_url"
              name="avatar_url"
              label="Avatar URL"
              type="text"
              value={formValues.avatar_url}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="language"
              name="language"
              label="Language"
              type="text"
              value={formValues.language}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Button style={{ marginTop: '20px' }} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateACharacter;