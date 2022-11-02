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
  const { myFighter, setMyFighter, spells, setSpells, setCharacters } = useContext(LoggedContext)

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

  // creates local held state for a boolean that provides that info if a valid champion has been selected
  const [validFighter, setValidFighter] = useState(false)

  // on render and whenever the champion is changed, this sets the champion validity to true or false
  useEffect(() => {
    myFighter.card.name ? setValidFighter(true) : setValidFighter(false)
  }, [myFighter])

  // holds state with logic that sets to true if a valid character is selected as champion and the user selects the spell to be added to the character
  const [addToCharacter, setAddToCharacter] = useState(false);

  // This changes the boolean for the addToCharacter state switch and adds character id to formvalues if the addcharacter switch is pressed
  const handleAddCharacterSwitchChange = (e) => {
    if (validFighter) {
      setAddToCharacter(e.target.checked);
      setFormValues({ ...formValues, character_id: myFighter.card.id })
    }
  }

  // This useeffect listens for changes in fighter validity and if invalid, it shuts off the add character switch
  useEffect(() => {
    if (!validFighter) {
      setAddToCharacter(false)
    }
  }, [validFighter])

  // sets the local state with the spell chosen from the select menu, initially it is set to have a key of id equal to an empty string so that the select element
  // can provide a default value to the list
  const [chosenSpell, setChosenSpell] = useState({ id: '' });

  // sets state with a blank spell when the 'no spell option is selected from the select menu
  function handleSpellDeselect() {
    setChosenSpell({ id: '' })
  }

  // Sets state with the selected spell from the drop down menu
  function handleSpellSelect(e) {
    let thisSpell = spells.find((spell) => spell.id === e.target.value)
    // console.log('from spells the spell id', thisSpell.id)
    setChosenSpell(thisSpell)
  }

  // select holds a boolean that controls the spell select drop down menu, if the spell form has been used, then the select menu is disabled
  const [select, setSelect] = useState(false);

  // effect is run every time the controlled form is changed and if their are any input values in the form, then the select state is set to true, this select state
  // will disable the select element below and prevent it from being used
  useEffect(() => {
    let isSelected = false
    let basicFormValues = { ...formValues }
    basicFormValues.character_id = 0
    for (const trait in basicFormValues) {
      if (Boolean(basicFormValues[trait])) {
        isSelected = true
      }
    }
    setSelect(isSelected)
  }, [defaultValues])

  // textField holds a boolean that controls the spell form, if a spell has been seleced, the forms are disabled
  const [textField, setTextField] = useState(false);

  // when chosenSpell is updated, this sets the textField state to disable the text fields
  useEffect(() => {
    setTextField(Boolean(chosenSpell.id) ? true : false)
  }, [chosenSpell])

  // the handlesubmit function creates a fetch to active record, the server is addressed to spells and the character id are included as params
  // a variable holding patch and post objects are created and their body's hold the appropriate information based on a new spell being 
  // created for post or an existing spell being used for patch, a ternary decides whether this is a post or a patch based on the addToChaaracter switch
  // and the returned json includes all characters and their associated spells and all spells. It also includes the character with the updated spells
  // which is used to track hit points for fighting
  function handleSubmit(e) {
    e.preventDefault();
    let charid = myFighter.card.id
    const server = `http://localhost:9292/spells/${charid}`
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues)
    }
    console.log('chosenSpell', chosenSpell)
    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenSpell)
    }
    // ternary that will always post the fetch unless the user has been selected to add a character and some information exists in the create a spell form
    let postOrPatch = addToCharacter && !select ? patch : post
    console.log('from spells postorpatch', postOrPatch)
    fetch(server, postOrPatch)
      .then((r) => r.json())
      .then((everything) => {
        setCharacters(everything.characters)
        setSpells(everything.spells)
        setFormValues(defaultValues)
        setMyFighter({ card: everything.updatedFighter })
        // console.log('spell count', spells.length)
        // console.log('updated fighter from ruby spell count', everything.updatedFighter.spells.length)
        // console.log('everything.updatedFighter from ruby in spells', {card: everything.updatedFighter})
        // console.log('charid from patch in spells', charid)
      });
  };

  // Renders a menu item for each spell in the spell dropdown
  const listSpells = spells.map((spell) => {
    let id = spell.id
    return (
      <MenuItem key={id} value={id} >{`Level ${spell.level} ${spell.name} spell casts ${spell.damage} damage points`}</MenuItem>
    )
  });

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
            <Typography variant='h4' style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '0px', marginBottom: '35px', color: '#ea2424' }}>
              Choose an existing spell!
            </Typography>
            <FormControl variant="outlined" style={{ minWidth: 600 }}>
              <InputLabel id="spell-select">Select A Spell</InputLabel>
              {/* The select elements value is controlled through chosenSpell state and will be disabled when spell forms have values */}
              <Select
                disabled={select}
                labelId="spell-select"
                id="spell-select"
                value={chosenSpell.id}
                onChange={handleSpellSelect}
                label="chosenSpell"
              >
                <MenuItem value={chosenSpell.id} onClick={handleSpellDeselect}> No Spell </MenuItem>
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
                  // The switch element provides a controlled state held logic to add a spell to a character or not
                  <Switch
                    disabled={!validFighter}
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