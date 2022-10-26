//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { Route, Routes } from 'react-router-dom';

//component imports
import FacultyCourses from './FacultyCourses';
import FacultyCards from './FacultyCards';

//material imports
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

function Faculty() {
  //assigning variables and context
  const { currentUser } = useContext(LoggedUserContext)
  const courses = ["eng101", "eng202", "eng303", "eng404", "eng505"]

  //lists the courses in new component
  const listCourses = courses.map((course, i) => {
    return (
      <FacultyCourses key={i} course={course} />
    )
  })

  //class for the main list of courses
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

  //returns container holding menu of courses and book card via a route
  return (
    <>
      {currentUser && currentUser.role === 'professor' ?
        <Container style={{ marginTop: '100px', marginBottom: '100px' }}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Your courses!
              </ListSubheader>
            }
            className={classes.root}
          >
            {listCourses}
          </List>
          <Routes>
            <Route path=":course/:bookId/:jsonId" element={<FacultyCards />} />
          </Routes>
        </Container>
        : currentUser && currentUser.role === 'student' ? <h3 style={{ marginTop: '100px' }}>Get out of here, you're here to learn!</h3> : <h3 style={{ marginTop: '100px' }}>Please login to view this content!</h3>}
    </>
  )
}

export default Faculty;