import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { LoggedContext } from "./LoggedContext";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Characters from "./Characters";

function Spells() {
  const { myFighter, spells, setSpells, setCharacters } = useContext(LoggedContext)
  const defaultValues = {
    name: "",
    description: "",
    range: "",
    material: "",
    duration: "",
    casting_time: "",
    level: 0,
    damage: 0,
    character_id: 0
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [addToCharacter, setAddToCharacter] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'level' || name === 'damage') {
      value = parseInt(value)
    } else {
      value = value
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // change boolean for addToCharacter switch and add character id to formvalues
  const handleChange = (e) => {
    console.log(myFighter.card.id)
    if (Object.keys(myFighter.card).length > 1) {
      setAddToCharacter(e.target.checked);
      setFormValues({ ...formValues, character_id: myFighter.card.id })
    } else {
      alert('You must select a champion first!')
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const server = 'http://localhost:9292/spells'
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues)
    }
    fetch(server, post)
      .then((r) => r.json())
      .then((data) => {
        setSpells([...spells, data])
        let updatedCharacters = Characters.map
        setCharacters
      });
  };

  console.log(spells)

  return (
    <Container style={{ marginTop: '-600px' }}>
      <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '-40px', marginBottom: '75px', color: '#ea2424', textShadow: '3px 3px 5px #000000' }}>
        Create your new and fearsome spells here, O Great Wizard. Firstly, you may create new spells and add it to your champions repertoire or simply create a spell to add magical knowledge to our realm. Lastly, you may choose a spell from the sacred tomes and add it to your character to wield.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} >
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="material"
              name="material"
              label="Material"
              type="text"
              value={formValues.material}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="range"
              name="range"
              label="Range"
              type="text"
              value={formValues.range}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="duration"
              name="duration"
              label="Duration"
              type="text"
              value={formValues.duration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="casting_time"
              name="casting_time"
              label="Casting Time"
              type="text"
              value={formValues.casting_time}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="level"
              name="level"
              label="Level"
              type="number"
              value={formValues.level}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ backgroundColor: 'white' }}
              variant="filled"
              id="damage"
              name="damage"
              label="Damage"
              type="number"
              value={formValues.damage}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <FormGroup style={{ marginTop: '50px' }}>
              <FormControlLabel
                control={
                  <Switch
                    disabled={false}
                    checked={addToCharacter}
                    onChange={handleChange}
                    name="characterSwitch"
                  />
                }
                label="Add to Character"
              />
            </FormGroup>
            <Button style={{ marginTop: '20px' }} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Spells;