//functional imports
import React, { useEffect, useState, useContext } from 'react';

//material imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

function Home() {

  //displays the title and picture on the main page
  return (
    <div>
      <Container  style={{ margin: '-550px', paddingLeft: '50px', marginLeft: 'auto', marginRight: 'auto' }} >
        <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '25px', color: '#ea2424', textShadow: '3px 3px 5px #000000' }}>
          Welcome to the Battle Arena. Take a look at some of the characters primed and ready for battle or create your own! Add spells to your characters to increase their power and lay waste to their enemies. When you're ready to battle, click the Fight link and cross your fingers.
        </Typography>
      </Container>
    </div>
  )
}

export default Home;