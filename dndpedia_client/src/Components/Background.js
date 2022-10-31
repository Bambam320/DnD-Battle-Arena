// functional imports
import React from 'react'

// material ui components and necessary files
import { Typography, Container } from '@material-ui/core';
import image from '../images/arena_background.png'

function Background() {

  // sets the style of the background image
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  // returns the background image and a title that lives on every component of this SPA
  return (
    <div style={backgroundStyle}>
      <Container maxWidth={false} >
      <Typography className='gradient-text' variant='h3' style={{ fontWeight: '800', textAlign: 'center', marginBottom: '25px' }}>
        Dungeon & Dragons Battle Arena
      </Typography>
      </Container>
    </div>
  )
};

export default Background;