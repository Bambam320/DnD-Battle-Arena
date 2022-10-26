//functional imports
import React, { useEffect, useState } from 'react'
import image from '../images/arena_background.png'

//material imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    height: '100vh',
    width: '100vw',
    marginTop: '-70px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  //displays the title and picture on the main page
  return (
    <div style={backgroundStyle}>
      <div>
        <Container style={{ marginTop: '80px', marginBottom: '100px' }}>
          <Typography className='gradient-text' variant='h3' style={{ fontWeight: '800', textAlign: 'center', marginBottom: '25px' }}>
            Dungeon & Dragons Battle Arena
          </Typography>
        </Container>
        <Container style={{ marginTop: '15px' }} >
          <Grid container spacing={24} justifyContent="space-evenly" columnSpacing={24}>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Home;