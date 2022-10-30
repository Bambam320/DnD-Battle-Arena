import React, { useEffect, useContext } from 'react';
import Charactercards from './CharacterCards';
import { LoggedContext } from './LoggedContext';
import { Outlet } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Characters() {
  const { characters, setCharacters } = useContext(LoggedContext)

  function handleDeleteCharacter(id) {
    const newCharacters = characters.filter((character) => character.id != id)
    setCharacters(newCharacters)
  }


  const listCharacters = characters.map((singleCharacter) => {

    return (
      <React.Fragment key={singleCharacter.id} >
        <Grid item={4}>
          <Charactercards card={singleCharacter} onDeleteCharacter={handleDeleteCharacter}/>
        </Grid>
      </React.Fragment>
    )
  })

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
