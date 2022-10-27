//functional imports
import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

//material imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button'


function CharacterCards({card}) {
  const { opponent, setOpponent, myFighter, setMyFighter } = useContext(LoggedContext)

  //creates variables to store information from props to be used in displaying content
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

  function handleAddMainFighter() {
    setMyFighter({card})
  }

  function handleAddOpponentFighter() {
    setOpponent({card})
  }

  return(
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
      <CardMedia
        style={{borderStyle: "solid", borderWidth: '5px', borderColor: "#dce04f"}} 
        component="img"
        height="200px"
        width="200px"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
      <Typography variant="h6" component="em" style = {{ fontWeight: 'bold'}}>
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
      <Button onClick={handleAddOpponentFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold" }}>
        Set As Opponent
      </Button>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CharacterCards;