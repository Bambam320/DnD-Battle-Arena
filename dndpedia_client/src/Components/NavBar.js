//functional imports
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

//material imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

function NavBar() {

  const drawerWidth = 150;

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
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/home">Home</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/characters">Characters</Link>
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
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/spells">Spells</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <Link className='linkFont' style = {{ textDecoration: "none" }} to="/fight">Fight</Link>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
}

export default NavBar;