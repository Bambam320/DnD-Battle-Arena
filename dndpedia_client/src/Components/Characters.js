// functional imports
import React, { useContext } from 'react';
import Charactercards from './CharacterCards';
import { LoggedContext } from './LoggedContext';
import { Outlet, useNavigate } from 'react-router-dom';

//material ui imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Characters() {

////////////////////
  ////////////////
  const navigate = useNavigate()


  // grabs all the characters from context
  const { characters, setCharacters } = useContext(LoggedContext)


  //
  // function is passed back as props from CharacterCards, this updates the characters held in state to remove the user requested deleted character
  function handleDeleteCharacter(id) {
    const newCharacters = characters.filter((character) => character.id != id)
    setCharacters(newCharacters)
    navigate('/characters')
  }

  console.log('all characters from characters', characters)

  // lists a card for each character held in state, it passes card which represents each character and passes the delete function as props
  const listCharacters = characters.map((singleCharacter) => {
    return (
      <React.Fragment key={singleCharacter.id} >
        <Grid item={4}>
          <Charactercards card={singleCharacter} onDeleteCharacter={handleDeleteCharacter} />
        </Grid>
      </React.Fragment>
    )
  })

  // returns a container and grid for spacing then calls listCharacters to render a component for each card
  return (
    <>
      <Container style={{ margin: '-600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Grid container spacing={10} justifyContent="space-evenly" columnspacing={10}>
          {listCharacters}
        </Grid>
      </Container>
      <Outlet />
    </>
  )
};

export default Characters;
