//functional imports
import React, { useContext, useState, useEffect } from 'react';
import { LoggedContext } from './LoggedContext'
import { Outlet, Link } from 'react-router-dom';

//material imports
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

function NavBar() {
  const { opponent, myFighter } = useContext(LoggedContext)
  const [ validFighter, setValidFighter ] = useState(false)
  const [ validOpponent, setValidOpponent ] = useState(false)
  // console.log('fighter', myFighter)
  // console.log('opponent', opponent)

  useEffect(() => {
    myFighter.card.name ? setValidFighter(true) : setValidFighter(false)
  }, [myFighter])

  useEffect(() => {
    opponent.card.name ? setValidOpponent(true) : setValidOpponent(false)
  }, [opponent])

  const drawerWidth = 175;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "yellow"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/">Home</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/characters/">Characters</Link>
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/create_a_character">Create A Character</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/spells">Create And Add Spells</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/fight">Fight</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <p className='characterFont'>{validFighter ? 
              `Your champion: ${myFighter.card.name} has ${myFighter.card.attack_points + myFighter.card.spell_points} hit points` : 
              `No champion has been selected` }
            </p>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <p className='characterFont'>{validOpponent ?
              `Your opponent: ${opponent.card.name} has ${opponent.card.attack_points + opponent.card.spell_points} hit points` : 
              `No opponent has been selected`}
            </p>
          </ListItem>
        </List>
      </Drawer>
              <Outlet /> 
    </div>
  );
}

export default NavBar;