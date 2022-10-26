//functional imports
import React, { useEffect, useState } from 'react';

//component imports
import FacultyCoursesExpanded from './FacultyCoursesExpanded'

//material imports
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CollectionsIcon from '@material-ui/icons/Collections';

function FacultyCourses({ course }) {
  //assigning state variables
  const [open, setOpen] = useState(false)
  const [courseMaterial, setCourseMaterial] = useState([])

  //useEffect to grab the current course and set state with it
  useEffect(() => {
    const host = `http://localhost:3001/`
    fetch(`${host}${course}`)
      .then((r) => r.json())
      .then((data) => setCourseState(data))
  }, [])

  //from useEffect: set state with the array of books in the course
  function setCourseState(readingAssignments) {
    setCourseMaterial(readingAssignments)
  }

  //list the expanded components for each book in the course
  const listCourseMaterials = courseMaterial.map((book) => {
    let bookId = (Object.keys(book)[0])
    let bookInfo = {
      'bookId': bookId,
      imageUrl: book[`${bookId}`].cover.large || 'https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk=',
      title: book[`${bookId}`].title,
      author: book[`${bookId}`].authors[0].name,
      publishDate: book[`${bookId}`].publish_date || 'Unknown',
      publishedBy: book[`${bookId}`].publishers[0].name,
      publishedIn: book[`${bookId}`].publish_places[0].name || 'Unknown',
      excerpt: book.chapters.chapter_1.content.substr(0, 200),
      bookPreview: book[`${bookId}`].ebooks[0].preview_url
    }
    let jsonId= book.id
    
    //returns expanded list of books for each course
    return (
      <div>
        <Collapse 
          in={open} 
          timeout="auto" 
          unmountOnExit>
            <FacultyCoursesExpanded bookInfo={bookInfo} course={course} jsonId={jsonId}/>
        </Collapse>
      </div>
    )
  })

  //set click boolean to list books under course or close the list
  const handleClick = () => {
    setOpen(!open)
  }

  //lists a menu header for each course in the json server
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary={`English Literature ${course.substr(3)}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {listCourseMaterials}
    </>
  )
};

export default FacultyCourses;