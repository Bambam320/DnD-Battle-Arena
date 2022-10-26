//functional imports
import React from 'react';
import { Link, Route } from 'react-router-dom';

//material imports
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

function FacultyCoursesExpanded({bookInfo, course, jsonId}) {
  //assigns variables for displaying info
  const {bookId, title} = bookInfo

  //style for menu list
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  //returns menu lists which are links for each book in the course, the url passes params later needed
  return (
    <List component="div" disablePadding>
      <ListItem button component={Link} to={`/faculty/${course}/${bookId}/${jsonId}`}
        className={classes.nested}>
        <ListItemIcon>
          <ChromeReaderModeIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </List>
  )
}

export default FacultyCoursesExpanded;