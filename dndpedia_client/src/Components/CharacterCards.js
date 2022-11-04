// functional imports
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

// material ui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button'

function CharacterCards({ card, onDeleteCharacter }) {

  // grabs the setter state function for the opponent and the fighter
  const { setOpponent, setMyFighter } = useContext(LoggedContext)

  //creates variables to store information from props to be used in displaying content
  const { id, background, c_lass, name, city, level, language, alignment, melee_weapon,
    pet, race, ranged_weapon, avatar_url, attack_points, spell_points } = card

  let char_id = id

  // sets the myFighter and opponent state with the card for the character that is selected to be the one or the other
  // prevents the link component in the whole card from firing when one of the buttons inside of it is clicked
  function handleAddMainFighter(e) {
    e.preventDefault()
    setMyFighter({ card })
  }
  function handleAddOpponentFighter(e) {
    e.preventDefault()
    setOpponent({ card })
  }

  // fetches a delete url from sinatra to delete a character from the database, the returned JSON is not used and the onDeleteCharacter function is called
  function handleDeleteCharacter(e) {
    e.preventDefault()
    fetch(`http://localhost:9292/characters/${char_id}`, {
      method: "DELETE",
    });
    onDeleteCharacter(char_id)
  }

  // returns a card for each character
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
      {/* The entire card is a link to that characters spell in the component CharacterSpells */}
      <CardActionArea component={Link} to={`/characters/${char_id}/spells`}>
        <CardMedia
          style={{ borderStyle: "solid", borderWidth: '5px', borderColor: "#dce04f" }}
          component="img"
          height="200px"
          width="200px"
          image={avatar_url}
          alt={name}
        />
        <CardContent>
          {/* Listing out all of the information about the character */}
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
            {`Character Class: ${c_lass}`}
          </Typography>
          <Typography>
            {`Language: ${language}`}
          </Typography>
          <Typography>
            {`Melee Weapon: ${melee_weapon}`}
          </Typography>
          <Typography>
            {`Pet: ${pet}`}
          </Typography>
          <Typography>
            {`Race: ${race}`}
          </Typography>
          <Typography>
            {`Ranged Weapon: ${ranged_weapon}`}
          </Typography>
          <Typography>
            {`Character Level: ${level}`}
          </Typography>
          <Typography>
            {`Melee attack power: ${attack_points} points`}
          </Typography>
          <Typography>
            {`Spell attack power: ${spell_points} points`}
          </Typography>
          {/* Renders buttons for adding this character as your fighter or opponent, deleting this character or updating this character. */}
          {/* The update character button is a link to this characters updatable traits. The link renders the UpdateCharacter component from app */}
          <Button onClick={handleAddMainFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginTop: "10px", marginBottom: "20px" }}>
            Set As My Character
          </Button>
          <Button onClick={handleAddOpponentFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginBottom: "20px" }}>
            Set As Opponent
          </Button>
          <Button onClick={handleDeleteCharacter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginBottom: "20px" }}>
            Delete This Character
          </Button>
          <Button component={Link} to={`/characters/${char_id}/update`} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold" }}>
            Update This Character
          </Button>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}

export default CharacterCards;