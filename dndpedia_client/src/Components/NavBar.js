//functional imports
import React, { useContext, useState, useEffect } from 'react';
import { LoggedContext } from './LoggedContext'
import { Outlet, Link } from 'react-router-dom';

//material ui imports
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

function NavBar() {

  // grabs opponent and champion from context, the setter for this state is also located in CharacterCards.js. The setters here place an empty object in state when
  // deselected
  const { opponent, myFighter, setMyFighter, characters, setOpponent } = useContext(LoggedContext)

  // Holds a boolean to determine if a valid fighter or opponent is held in state
  const [validFighter, setValidFighter] = useState(false)
  const [validOpponent, setValidOpponent] = useState(false)

  // On render and when myFighter is updated, this effect will set a state holding a boolean to true if a fighter is selected which displays the fighters information
  // in the return statement blow. The same is true for both effects.
  useEffect(() => {
    myFighter.card.name ? setValidFighter(true) : setValidFighter(false)
  }, [myFighter, characters])
  useEffect(() => {
    opponent.card.name ? setValidOpponent(true) : setValidOpponent(false)
  }, [opponent, characters])

  // handles deselecting the champion or fighter when deselct is clicked for either position
  function handleDeselect(position) {
    const cleanObj = {
      card: {
        name: '',
        id: 0
      }
    }
    if (position === 'opponent') {
      setOpponent(cleanObj)
    } else {
      setMyFighter(cleanObj)
    }
  }

  // creates a variable that stores the selected champions spell and attack point total for display
  const fighterHitPoints = () => {
    let hitPoints = myFighter.card.attack_points + myFighter.card.spell_points
    console.log('fighter hit points fired hitpoints:', hitPoints)
    return hitPoints
  }

  // styling for the drawer including color and width.
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
  // uses a variable classes to use styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Drawer takes the styles and displays the links below */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* Lists links in the app */}
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <Link className='linkFont' style={{ textDecoration: "none" }} to="/">Home</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style={{ textDecoration: "none" }} to="/characters/">Characters</Link>
          </ListItem>
        </List>
        <List>

          {}
          <ListItem button>
            <Link className='linkFont' style={{ textDecoration: "none" }} to="/characters/new">Create A Character</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style={{ textDecoration: "none" }} to="/spells">Create And Add Spells</Link>
          </ListItem>
        </List>
        <Divider />
        <List>

          {}
          <ListItem button>
            <Link className='linkFont' style={{ textDecoration: "none" }} to="/characters/fight">Fight</Link>
          </ListItem>
        </List>
        <Divider />
        <List>

          { }
          {/* a ternary operater checks if there is a fighter selected and presents that information but if no fighter is selected, it says as much. */}
          <ListItem>
            <p className='characterFont'>{validFighter ?
              `Your champion: ${myFighter.card.name} has ${fighterHitPoints()} hit points` :
              `No champion has been selected`}
            </p>
          </ListItem>
          {/* A ternary operator to display the button based on a fighter being selected or not */}
          {validFighter ?
            <Button
              onClick={() => handleDeselect('champion')}
              style={{
                marginTop: '5px',
                borderRadius: 5,
                backgroundColor: "#ea2424",
                color: "white",
                padding: "10px 20px",
                fontSize: "11px",
                fontWeight: "bold"
              }}
            > Deselect Champion </Button> : <></>}
        </List>
        <Divider />
        <List>
          {/* a ternary operater checks if there is an opponent selected and presents that information but if no opponent is selected, it says as much. */}
          <ListItem>
            <p className='characterFont'>{validOpponent ?
              `Your opponent: ${opponent.card.name} has ${opponent.card.attack_points + opponent.card.spell_points} hit points` :
              `No opponent has been selected`}
            </p>
          </ListItem>
          {/* A ternary operator to display the button based on a opponent being selected or not */}
          {validOpponent ?
            <Button
              onClick={() => handleDeselect('opponent')}
              style={{
                marginTop: '5px',
                borderRadius: 5,
                backgroundColor: "#ea2424",
                color: "white",
                padding: "10px 20px",
                fontSize: "11px",
                fontWeight: "bold"
              }}
            > Deselect Opponent </Button> : <></>}
        </List>
      </Drawer>
      {/* Outlet lets the children of the parent route "/" to be rendered */}
      <Outlet />
    </div>
  );
}

export default NavBar;