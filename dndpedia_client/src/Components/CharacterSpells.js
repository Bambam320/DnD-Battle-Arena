//functional imports
import React, { useContext } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

//material imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'

function CharacterSpells() {
  const { characters } = useContext(LoggedContext)
  const params = useParams()

  let card = characters.find((character) => character.id === parseInt(params.id))
  let name = card.name

  console.log(card.spells)

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
        <Typography style={{marginBottom: '10px' }}>
          {`${i + 1}. ${name}`}
        </Typography>
        <Typography style={{marginBottom: '10px' }}>
          {`Causes ${damage} points of damage for ${duration} with a range of ${range} and uses ${material}.`}
        </Typography>
        <Typography style={{marginBottom: '20px' }}>
          {`Description: ${description}`}
        </Typography>
      </React.Fragment>
    )
  })

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
}

export default CharacterSpells;