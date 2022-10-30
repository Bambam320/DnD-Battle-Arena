//functional imports
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

//material imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button'


function CharacterCards({ card, onDeleteCharacter }) {
  const { setOpponent, setMyFighter } = useContext(LoggedContext)

  //creates variables to store information from props to be used in displaying content
  let id = card.id
  let name = card.name
  let alignment = card.alignment
  let background = card.background
  let city = card.city
  let klass = card.c_lass
  let language = card.language
  let meleeWeapon = card.melee_weapon
  let pet = card.pet
  let race = card.race
  let rangedWeapon = card.ranged_weapon
  let level = card.level
  let attackPoints = card.attack_points
  let spellPoints = card.spell_points
  let imageUrl = card.avatar_url

  function handleAddMainFighter(e) {
    e.preventDefault()
    setMyFighter({ card })
  }

  function handleAddOpponentFighter(e) {
    e.preventDefault()
    setOpponent({ card })
  }

  function handleDeleteCharacter(e) {
    e.preventDefault()
    fetch(`http://localhost:9292/characters/${id}`, {
      method: "DELETE",
    });
    onDeleteCharacter(id)
  }
  
  return (
    <Card
      style={{
        marginBottom: '50px',
        maxWidth: '300px',
        borderStyle: "solid",
        borderWidth: '5px',
        borderColor: "red"
      }} variant="outlined"
    >
      <CardActionArea component={Link} to={`/characters/${id}/spells`}>
        <CardMedia
          style={{ borderStyle: "solid", borderWidth: '5px', borderColor: "#dce04f" }}
          component="img"
          height="200px"
          width="200px"
          image={imageUrl}
          alt={name}
        />
        <CardContent>
          <Typography variant="h6" component="em" style={{ fontWeight: 'bold' }}>
            {`Name: ${name}`}
          </Typography>
          <Typography>
            {`Background: ${background}`}
          </Typography>
          <Typography>
            {`Alignment: ${alignment}`}
          </Typography>
          <Typography>
            {`City of Origin: ${city}`}
          </Typography>
          <Typography>
            {`Character Class: ${klass}`}
          </Typography>
          <Typography>
            {`Language: ${language}`}
          </Typography>
          <Typography>
            {`Melee Weapon: ${meleeWeapon}`}
          </Typography>
          <Typography>
            {`Pet: ${pet}`}
          </Typography>
          <Typography>
            {`Race: ${race}`}
          </Typography>
          <Typography>
            {`Ranged Weapon: ${rangedWeapon}`}
          </Typography>
          <Typography>
            {`Character Level: ${level}`}
          </Typography>
          <Typography>
            {`Melee attack power: ${attackPoints} points`}
          </Typography>
          <Typography>
            {`Spell attack power: ${spellPoints} points`}
          </Typography>
          <Button onClick={handleAddMainFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginTop: "10px", marginBottom: "20px" }}>
            Set As My Character
          </Button>
          <Button onClick={handleAddOpponentFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginBottom: "20px" }}>
            Set As Opponent
          </Button>
          <Button onClick={handleDeleteCharacter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginBottom: "20px"  }}>
            Delete This Character
          </Button>
          <Button component={Link} to={`/characters/${id}/update`} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold"}}>
            Update This Character
          </Button>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}

export default CharacterCards;