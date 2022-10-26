import React from 'react'

import { Typography, Container } from '@material-ui/core';
import image from '../images/arena_background.png'

function Background() {

  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundStyle}>
      <Container maxWidth={false} >
      <Typography className='gradient-text' variant='h3' style={{ fontWeight: '800', textAlign: 'center', marginBottom: '25px' }}>
        Dungeon & Dragons Battle Arena
      </Typography>
      </Container>
    </div>
  )
}

export default Background