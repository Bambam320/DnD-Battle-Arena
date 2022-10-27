//functional imports
import React, { useEffect, useState } from 'react'
import image from '../images/arena_background.png'

//material imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


function Home() {


  //displays the title and picture on the main page
  return (
    <div>
      <Container style={{ margin: '-600px' }}>
        <Typography>
          Welcome to the Dungeon & Dragons Battle Arena. Take a look at some of the characters primed and ready for battle or create your own! Add spells to your characters to increase their power and lay waste to their enemies. When you're ready to battle, click the Fight link and cross your fingers.
        </Typography>
      </Container>
    </div>
  )
}

export default Home;