// functional imports
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoggedContext } from './LoggedContext';

// material ui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';

function Fight() {

  // grabs the characters held in state function for the opponent and the fighter
  const { opponent, myFighter } = useContext(LoggedContext)

  //
  const [champion, setChampion] = useState({...myFighter})
  
  //
  const [challenger, setChallenger] = useState({...opponent})


  //
  function handleFight(e) {
    e.preventDefault()
    if (((champion.card.spell_points + champion.card.attack_points) * Math.random()) > ((opponent.card.spell_points + opponent.card.attack_points) * Math.random())) {
      setChampion({...champion, card: {...champion.card, avatar_url: "https://media.tenor.com/BA4S2y58lbEAAAAS/chris-farley-academy-awards.gif"}})
      setChallenger({...challenger, card: {...challenger.card, avatar_url: "https://media.tenor.com/eTqdoJ96YP4AAAAM/failure-fail.gif"}})
    } else {
      setChampion({...champion, card: {...champion.card, avatar_url: "https://media.tenor.com/eTqdoJ96YP4AAAAM/failure-fail.gif"}})
      setChallenger({...challenger, card: {...challenger.card, avatar_url: "https://media.tenor.com/BA4S2y58lbEAAAAS/chris-farley-academy-awards.gif"}})
    }
  }




  //
  function handleReset(e) {
    e.preventDefault()
    setChampion({...myFighter})
    setChallenger({...opponent})
  }





  // lists two cards for each fighter by declaring variables and using material ui components for styling
  const listFighters = [champion, challenger].map((each, i) => {

    // creates variables to store information about each fighter to use in displaying content
    const { name, city, level, melee_weapon, pet, race,
      ranged_weapon, avatar_url, attack_points, spell_points } = each.card

    return (
      <React.Fragment key={i}>
        <Card
          style={{
            marginBottom: '50px',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderStyle: "solid",
            borderWidth: '5px',
            borderColor: "red"
          }} variant="outlined"
        >
          <CardActionArea component={Button} >
            <CardMedia
              style={{ borderStyle: "solid", borderWidth: '5px', borderColor: "#dce04f" }}
              component="img"
              height="200px"
              width="200px"
              image={avatar_url}
              alt={name}
            />
            <CardContent>
              <Typography variant="h6" component="em" style={{ fontWeight: 'bold' }}>
                {`Name: ${name}`}
              </Typography>
              <Typography>
                {`City of Origin: ${city}`}
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
            </CardContent>
          </CardActionArea>
        </Card >
      </React.Fragment>
    );
  });

  return (
    <Container style={{ margin: '-600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {Boolean(myFighter.card.name) && Boolean(opponent.card.name) ? listFighters : 
          <Typography 
            variant="h3" 
            style={{ 
              fontWeight: 'bold', 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#ea2424', 
              textShadow: '3px 3px 5px #000000' 
            }}
          >Select an Opponent for your Champion and go to battle!
          </Typography>}
      </Grid>
      <Grid>
        <form onSubmit={handleFight}>
          <Button style={{ marginTop: '450px', position: 'absolute', top: '47%', left: '53%', backgroundColor: '#ea2424', color: 'white' }} variant="contained" type="submit">
            Fight!
          </Button>
        </form>
        <form onSubmit={handleReset}>
          <Button style={{ marginTop: '500px', position: 'absolute', top: '47%', left: '53%', backgroundColor: '#ea2424', color: 'white' }} variant="contained" type="submit">
            Reset!
          </Button>
        </form>
      </Grid>
    </Container>
  )
};

export default Fight;