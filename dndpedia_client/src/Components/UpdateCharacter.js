//functional imports
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

//material imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField";

function UpdateCharacter() {
  const { characters, setCharacters } = useContext(LoggedContext)
  const params = useParams()
  const [characterTraits, setCharacterTraits] = useState({
    name: "",
    pet: "",
    level: 0,
    city: "",
    avatar_url: "",
    language: ""
  })

  // stores the current character to be updated into variable card
  let card = characters.find((character) => character.id === parseInt(params.id))
  // stores the id of the character to be used for params
  let id = card.id

  // Creates a new copy of character traits, maps over the keys of character traits and for each trait, it find the 
  // matching trait from the character and assigns the key and value from the character to variables, then updates
  // the new copy of the character traits object and updates state so that the default values have the traits from
  // the character
  useEffect(() => {
    let charObject = { ...characterTraits }
    Object.entries(characterTraits).map((trait) => {
      let traitName = Object.entries(card).find((ele) => ele[0] === trait[0])[0]
      let traitValue = Object.entries(card).find((ele) => ele[0] === trait[0])[1]
      charObject = { ...charObject, [traitName]: traitValue }
    })
    setCharacterTraits(charObject)
  }, [params.id])


  const handleInputChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setCharacterTraits({
      ...characterTraits,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    let server = `http://localhost:9292/characters/${id}`
    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterTraits)
    }
    fetch(server, patch)
      .then((r) => r.json())
      .then((data) => {
        console.log('data', data)
      });
  }

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
              value={characterTraits.name}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="language"
              name="language"
              label="Language"
              type="text"
              value={characterTraits.language}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="avatar_url"
              name="avatar_url"
              label="Avatar URL"
              type="text"
              value={characterTraits.avatar_url}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="city"
              name="city"
              label="City"
              type="text"
              value={characterTraits.city}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="pet"
              name="pet"
              label="Pet"
              type="text"
              value={characterTraits.pet}
              onChange={handleInputChange}
            />
            <TextField
              style={{ backgroundColor: 'white', marginBottom: '15px' }}
              variant="filled"
              id="level"
              name="level"
              label="Level"
              type="text"
              value={characterTraits.level}
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
}

export default UpdateCharacter;