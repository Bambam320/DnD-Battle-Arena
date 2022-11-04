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
  const { myFighter, setMyFighter, characters, spells, setSpells, setCharacters } = useContext(LoggedContext)

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

  // the handlesubmit function creates a fetch to active record, the server is addressed to post or patch the spell depending on form submission logic
  // a variable holding patch and post objects and another variable holding the post or patch server address are applied based on this form logic
  // If a new spell is created by the user it will be added to active record as a post
  // If a new spell is created and added to a character, it will be added to active record as a post and the character will be updated
  // If an existing spell is used to add to a character, the association will be udpated in active record.
  // In all 3 situations, the spell is returned from active record and it is updated in state here
  function handleSubmit(e) {
    e.preventDefault();

    // Variables for the selected character, post and patch server address
    let char_id = myFighter.card.id
    const postToSpellsServer = `http://localhost:9292/spells`
    const postToCharServer = `http://localhost:9292/spells/${char_id}/characters`
    const patchServer = `http://localhost:9292/characters/${char_id}/spells`

    // definitions for post and patch objects
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues)
    }
    // console.log('char id from spells for submit', char_id)
    // console.log('formValues from spells.js after submit', formValues)
    // console.log('chosenSpell', chosenSpell)


    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenSpell)
    }

    // ternary that will always post the fetch unless the user has been selected to add a character and some information exists in the create a spell form
    let postOrPatch = addToCharacter && !select ? patch : post
    let server = ''

    switch(true) {
      case addToCharacter && !select :
        server = patchServer;
        break;
      case addToCharacter && !textField:
        server = postToCharServer;
        break;
      default:
        server = postToSpellsServer;
    }
    
    console.log('from spells postorpatch', postOrPatch)
    console.log('from spells server', server)
    console.log('spell count before fetch', spells.length)
    // console.log('textfield from spells.js', textField)
    // console.log('select from spells.js', select)

    function updateTheCharacter(character, spell) {
      const updatedCharacter = { ...character, spells: [...character.spells, spell] }
      updatedCharacter.spell_points = character.spells.reduce((acc, val) => {
        return acc += val.level * val.damage * val.description.length / 8
      }, 0)
      setMyFighter({card: updatedCharacter})
      return updatedCharacter
    }

    // The address and object are filled in based on logic
    fetch(server, postOrPatch)
      .then((r) => r.json())
      .then((spell) => {

        //PATCH
        // the patch returns the spell and it updates characters along with updated the spell_points by reducing the new values from the spells array
        if (addToCharacter && !select) {
          console.log('patch is firing')
          let updatedCharacters = characters.map((character) => {
            if (character.id === spell.character_id) {
              return updateTheCharacter(character, spell)
            } else {
              return character
            }
          })
          setCharacters(updatedCharacters)

          //POST TO CHAR
          // the post returns the spell and it updates the state held spells, resets formValues and updates characters if there is a valid character
        } else if (addToCharacter && select) {
          console.log('post to char is firing')
          // console.log('spell from ruby after fetch', spell)
          // console.log('myfighter spells from spell.js', myFighter.card.spells)
          setSpells([...spells, spell])
          setFormValues(defaultValues)
          let updatedCharacters = characters.map((character) => {
            if (character.id === char_id) {
              console.log('updateTheCharacter', updateTheCharacter(character, spell))
              return updateTheCharacter(character, spell)
              
            } else {
              return character
            }
          })
          console.log('updated characters after fetch', updatedCharacters)
          setCharacters(updatedCharacters)


          // POST to spells only
        } else {
          console.log('post to spells only is firing')
          setSpells([...spells, spell])
          setFormValues(defaultValues)
        }

        // console.log('spell for patch returned', spell)
      });
  };



  //////////
  // console.log('length of string in character spell description', characters[1].spells[2].description.length)
  console.log('characters in spells', characters)
  console.log('spell count after fetch', spells.length)
  console.log('spells after fetch', spells)
  // console.log('myfighter spells from spell.js', myFighter.card.spells)

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