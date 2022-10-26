//functional imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//material imports
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Snackbar } from '@material-ui/core';

function FacultyCards() {
  //assigning state with the current question text input
  const [formValues, setFormValues] = useState('')
  //assigning state with the selected book
  const [book, setBook] = useState({})
  //assigning state with a boolean to indicate if a valid book object exists while displaying a card
  const [bookValid, setBookValid] = useState(false)
  //assigning state with the snackbar handler
  const [snackOpen, setSnackOpen] = useState(false)
  const params = useParams()

  //assigning global variables
  const host = `http://localhost:3001/`
  const course = params.course
  const id = params.jsonId

  //use sideeffect to fetch the book data from the json server
  useEffect(() => {
    fetch(`${host}${course}/${id}`)
      .then((r) => r.json())
      .then((data) => setBookData(data))
  }, [host, course, id])

  //from useEffect: to load state with selected book
  function setBookData(data) {
    setBook(data)
    setBookValid(true)
  }

  //assign book ID variable
  let bookId = Object.keys(book)[0]

  //holds state with current question input
  function handleInputChange(e) {
    setFormValues(e.target.value)
  }

  //puts the new question on the server in the matching book
  function handleSubmit(e) {
    e.preventDefault()
    const questionId = book.questions.length + 1
    const questions = book.questions.push({ id: questionId, question: formValues, answer: '' })
    const putBook = Object.assign(book, questions)
    console.log(questionId)
    console.log(`http://localhost:3001/${course}/${id}`)
    const put = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(putBook)
    }
    fetch(`http://localhost:3001/${course}/${id}`, put)
      .then((r) => r.json())
      .then((data) => clearForm(data))
    setSnackOpen(true)
  }

  //from handleSubmit: clears the question input form
  function clearForm() {
    setFormValues('')
  }

  //lists required data for faculty cards from info function call
  const info = (props) => {
    switch (true) {
      case bookValid && props === 1: return book[`${bookId}`].title
      case bookValid && props === 2: return book[`${bookId}`].authors[0].name
      case bookValid && props === 3: return book[`${bookId}`].number_of_pages
      case bookValid && props === 4: return book[`${bookId}`].publish_date
      default: return 'Loading...'
    }
  }

  //set snackbar state handler to close
  function handleSnackClose() {
    setSnackOpen(false)
  }

  //returns a card and form for each book to add questions to the json server with.
  return (
    <Container style={{ marginTop: '75px', marginBottom: '75px' }}>
      <Card
        style={{
          marginBottom: '50px',
          maxWidth: '500px',
          borderStyle: "solid",
          borderWidth: '5px',
          borderColor: "#2AA624"
        }} variant="outlined"
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title: {info(1)}
          </Typography>
          <Typography variant="h6">
            Written By: {info(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Pages: {info(3)} || Published: {info(4)}
          </Typography>
          <Typography>
            Assign questions below.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              style={{ width: 460 }}
              maxRows={20}
              aria-label="maximum height"
              placeholder="Write your question here..."
              defaultValue="Questioning..."
              value={formValues}
              onChange={handleInputChange}
            />
            <Button type="submit" style={{ backgroundColor: 'lightgreen' }}>Assign Question to current book!</Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message={`Your question has been assigned to this book.`}
      />
    </Container>
  )
}

export default FacultyCards;