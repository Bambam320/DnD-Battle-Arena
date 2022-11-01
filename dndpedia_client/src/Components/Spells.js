// functional imports
import React, { useState, useContext, useEffect } from "react";
import { LoggedContext } from "./LoggedContext";

// material ui imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Spells() {

  // grabs context from LoggedContext 
  const { myFighter, spells, setSpells, characters, setCharacters } = useContext(LoggedContext)
  
  // sets defaultValues variable to hold an object containing keys that will be used to create the input fields for the spell
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

  // sets a local state hook to hold the formValues from the user inputs. formValues is set to the default value
  const [formValues, setFormValues] = useState(defaultValues);

  // holds state with logic that sets to true if a valid character is selected as champion and the user selects the spell to be added to the character
  const [addToCharacter, setAddToCharacter] = useState(false);

  // sets the local state with the spell chosen from the select menu, initially it is set to have a key of id equal to an empty string so that the select element
  // can provide a default value to the list
  const [chosenSpell, setChosenSpell] = useState({id: ''});

  // select holds a boolean that controls the spell select drop down menu, if the spell form has been used, then the select menu is disabled
  const [select, setSelect] = useState(false);

  // textField holds a boolean that controls the spell form, if a spell has been seleced, the forms are disabled
  const [textField, setTextField] = useState(false);

  // Takes in the user input to the text fields for creating a spell, it handles numbers and strings appropriately and controls the form by updating formValues
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

  // This changes the boolean for the addToCharacter state switch and adds character id to formvalues if a character is available and returns an error if the 
  // character is not available
  const handleAddCharacterSwitchChange = (e) => {
    console.log(myFighter.card.id)
    if (Object.keys(myFighter.card).length > 1) {
      setAddToCharacter(e.target.checked);
      setFormValues({ ...formValues, character_id: myFighter.card.id })
    } else {
      alert('You must select a champion first!')
    }
  }

  // effect is run every time the controlled form is changed and if their are any input values in the form, then the select state is set to true, this select state
  // will disable the select element below and prevent it from being used
  useEffect(() => {
    let isSelected = false
    for (const trait in formValues) {
      if (Boolean(formValues[trait])) {
        isSelected = true
      }
    }
    setSelect(isSelected)
  }, [defaultValues])

  // give this a url with an id of the character and handle all this logic in ruby, just return the new set of spells and characters and update state
  // this is what nancy meant by handling all the work in Ruby or doing the heavy lifting

  // set the ID of the character to 0 if no fighter has been selected or the id of the fighter if it has, let ruby read the valid id and add it to characters
  // otherwise let ruby read a 0 and add the spell to the spells table only, it'll update spells and characters no matter what

  // write the post and the patch constants, then write an if conditional, if a character is selected and a pre-existing spell is selected, run the patch,
  // if a character is selected and a pre-existing spell is not selected, run the post. 
  
  // You have to add a lockout to the select menu if any of the formvalues
  // have been changed, then you need to disable the formvalues if a spell has been selected.
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
        let updatedCharacters = characters.map((char) => {
          if (char.id === myFighter.card.id) {
            myFighter.card.spells.push(data)
            myFighter.card.spell_points = myFighter.card.spell_points + (data.level * data.damage * data.description.length)
            return myFighter.card
          } else {
            return char
          }
        });
        setCharacters(updatedCharacters)
      });

      const patchServer = 'http://localhost:9292/'
      const patch = {
        method: "PATCH",
        headers: {
          "Contant-Type": "application/json",
        },
        body: JSON.stringify()
      }
  };

  // Renders a menu item for each spell in the spell dropdown
  const listSpells = spells.map((spell) => {
    let id = spell.id
    return (
      <MenuItem key={id} value={id} name='jew'>{`Level ${spell.level} ${spell.name} spell casts ${spell.damage} damage points`}</MenuItem>
    )
  });

  // Sets state with the selected spell from the drop down menu
  function handleSpellSelect(e) {
    let thisSpell = spells.find((spell) => spell.id === e.target.value)
    setChosenSpell(thisSpell)
  }

  return (
    <Container style={{ marginTop: '-600px' }}>
      <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '-40px', marginBottom: '75px', color: '#ea2424', textShadow: '3px 3px 5px #000000' }}>
        Create your new and fearsome spells here, O Great Wizard. Firstly, you may create new spells and add it to your champions repertoire or simply create a spell to add magical knowledge to our realm. Lastly, you may choose a spell from the sacred tomes and add it to your character to wield.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Typography variant='h4' style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '-40px', color: '#ea2424' }}>
              Create a spell!
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              disabled={textField}
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
              disabled={textField}
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
              disabled={textField}
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
              disabled={textField}
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
              disabled={textField}
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
              disabled={textField}
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
              disabled={textField}
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
              disabled={textField}
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
          <Grid item xs={12} >
            <Typography variant='h4' style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '0px', color: '#ea2424' }}>
              Choose an existing spell!
            </Typography>
            <FormControl variant="outlined" style={{minWidth: 600}}>
              <InputLabel id="spell-select">Select A Spell</InputLabel>
              <Select
                disabled={select}
                labelId="spell-select"
                id="spell-select"
                value={chosenSpell.id}
                onChange={handleSpellSelect}
                label="chosenSpell"
              >
              {listSpells}
              </Select>
            </FormControl>
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
                    onChange={handleAddCharacterSwitchChange}
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