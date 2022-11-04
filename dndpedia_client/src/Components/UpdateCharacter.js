//functional imports
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

//material ui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField";

function UpdateCharacter() {

  // grabs characters and setCharacters from context
  const { characters, setCharacters, myFighter, setMyFighter } = useContext(LoggedContext)

  // creates the params variable to hold the id of the character from the URL
  const params = useParams()

  // stores the current character to be updated into variable card
  let card = characters.find((character) => character.id === parseInt(params.id))

  // creates a local state for character and sets it initial value to card
  const [character, setCharacter] = useState(card)

  // stores the id of the character to be used for params
  let char_id = card.id

  // Creates a new copy of character traits in charObject, maps over the keys of the character traits array intended to be displayed and for each trait, it finds 
  // the matching trait value from the character and updates the charObject, then updates the local state for character with the new copy of the charObject 
  useEffect(() => {
    let charObject = { ...character };
    ['name', 'pet', 'level', 'city', 'avatar_url', 'language'].map((trait) => {
      let traitValue = Object.entries(card).find((ele) => ele[0] === trait)[1]
      charObject = { ...charObject, [trait]: traitValue }
    })
    setCharacter(charObject)
  }, [params.id])

  // updates the local state held characters attributes as they are typed in
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter({
      ...character,
      [name]: value,
    });
  };

  // The submit button fires a patch fetch to active record which provides it the current character with the updated attributes and 
  // returns the patched character then updates the state held characters and the main fighter
  // It also updates the characters spell and attack points to separate variables held in state
  function handleSubmit(e) {
    e.preventDefault();
    let server = `http://localhost:9292/characters/${char_id}`
    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character)
    }
    fetch(server, patch)
      .then((r) => r.json())
      .then((patchedCharacter) => {
        const updatedCharacter = { ...patchedCharacter }
        updatedCharacter.spell_points = patchedCharacter.spells.reduce((acc, val) => {
          return acc += val.level * val.damage * val.description.length / 8
        }, 0)
        updatedCharacter.attack_points = updatedCharacter.level * updatedCharacter.attack_points
        setMyFighter({ card: updatedCharacter })
        let updatedCharacters = characters.map((eachCharacter) => {
          if (eachCharacter.id === patchedCharacter.id) {
            return updatedCharacter
          } else {
            return eachCharacter
          }
        });
        setCharacters(updatedCharacters)
      });
  }

  // renders a card similar to CharacterSpells with the updateable attributes and their current value in a text field and a submit button to fire the patch
  return (
    <Container style={{ margin: '-600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card
        style={{
          marginBottom: '50px',
          maxWidth: '260px',
          borderStyle: "solid",
          borderWidth: '5px',
          borderColor: "red"
        }} variant="outlined"
      >
        <CardContent>
          <Typography variant="h6" component="em" style={{ fontWeight: 'bold' }}>
            {`${card.name}`}
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="name"
              name="name"
              label="Name"
              type="text"
              value={character.name}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="language"
              name="language"
              label="Language"
              type="text"
              value={character.language}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="avatar_url"
              name="avatar_url"
              label="Avatar URL"
              type="text"
              value={character.avatar_url}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="city"
              name="city"
              label="City"
              type="text"
              value={character.city}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="pet"
              name="pet"
              label="Pet"
              type="text"
              value={character.pet}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="level"
              name="level"
              label="Level"
              type="text"
              value={character.level}
              onChange={handleInputChange}
            />
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: "#21b6ae",
                color: "white",
                padding: "10px 20px",
                fontSize: "11px",
                fontWeight: "bold"
              }} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
};

export default UpdateCharacter;