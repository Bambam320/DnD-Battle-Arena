//functional imports
import React, { useContext } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

//material ui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core'

function CharacterSpells() {

  // grabs characters from context
  const { characters } = useContext(LoggedContext)

  // sets the params variable to use the id from the URL
  const params = useParams()

  // sets variables for card which find the character based on the id in params and for name which is the characters name to use for rendering it.
  let card = characters.find((character) => character.id === parseInt(params.id))
  console.log('card from characterSpells', card)
  let name = card.name

  // Returns text information about the spells attributes, there are several spells that belong to a character so it must be mapped over.
  const listSpells = card.spells.map((spell, i) => {
    let name = spell.name
    let id = spell.id
    let damage = spell.damage
    let range = spell.range
    let material = spell.material
    let duration = spell.duration
    let description = spell.description.substring(0, 125)
    return (
      <React.Fragment key={id}>
        <Typography style={{ marginBottom: '10px' }}>
          {`${i + 1}. ${name}`}
        </Typography>
        <Typography style={{ marginBottom: '10px' }}>
          {`Causes ${damage} points of damage for ${duration} with a range of ${range} and uses ${material}.`}
        </Typography>
        <Typography style={{ marginBottom: '20px' }}>
          {`Description: ${description}`}
        </Typography>
      </React.Fragment>
    )
  });

  // Returns a card for each characters spells
  return (
    <Container style={{ margin: '-600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card
        style={{
          marginBottom: '50px',
          maxWidth: '300px',
          borderStyle: "solid",
          borderWidth: '5px',
          borderColor: "red"
        }} variant="outlined"
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h6" component="em" style={{ fontWeight: 'bold' }}>
              {`${name}'s Spells`}
            </Typography>
            {listSpells}
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  )
};

export default CharacterSpells;