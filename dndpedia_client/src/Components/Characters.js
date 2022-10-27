import React, { useEffect, useState } from 'react';
import Charactercards from './CharacterCards';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Characters() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/characters')
      .then((r) => r.json())
      .then((data) => setCharacters(data))
  }, [])

  const listCharacters = characters.map((singleCharacter) => {
    return (
      <React.Fragment key={singleCharacter.id} >
        <Grid item={4}>
          <Charactercards card={singleCharacter} />
        </Grid>
      </React.Fragment>
    )
  })

  return (
    <>
      <Container style={{ margin: '-600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Grid container spacing={10} justifyContent="space-evenly" columnSpacing={10}>
          {listCharacters}
        </Grid>
      </Container>
    </>
  )
};

export default Characters;
