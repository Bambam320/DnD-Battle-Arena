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
      <Container style={{ marginTop: '80px', marginBottom: '100px', borderStyle: "solid", borderColor: "black", borderWidth: "10px"}}>
        <Typography className='gradient-text' variant='h3' style={{ fontWeight: '800', textAlign: 'justify', marginBottom: '25px' }}>
          Dungeon & Dragons Battle Arena
        </Typography>
      </Container>
      <Container style={{ marginTop: '15px' }} >
        <Grid container spacing={24} justifyContent="space-evenly" columnSpacing={24}>
        </Grid>
      </Container>
    </div>
  )
}

export default Home;