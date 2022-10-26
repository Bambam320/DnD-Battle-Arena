//functional imports
import React from 'react';
import { useNavigate } from 'react-router-dom';

//material imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core'

function Homecard({card}) {
  //uses navigate hook
  let navigate = useNavigate();

  //creates variables to store information from props to be used in displaying content
  let bookId = (Object.keys(card)[0])
  let imageUrl = card[`${bookId}`].cover.large || 'https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk='
  let title = card[`${bookId}`].title
  let author = card[`${bookId}`].authors[0].name
  let publishDate = card[`${bookId}`].publish_date || 'Unknown'
  let publishedBy = card[`${bookId}`].publishers[0].name
  let publishedIn = card[`${bookId}`].publish_places[0].name || 'Unknown'
  let excerpt = card.chapters.chapter_1.content.substr(0, 200)
  let bookPreview = card[`${bookId}`].ebooks[0].preview_url
  // console.log(card[`${bookId}`].cover.large, bookId) //more stuff
  
  
  function handleClick() {
    navigate("/login")
  }

  return(
    <Card 
      style={{
        marginBottom: '50px', 
        maxWidth: '500px', 
        borderStyle: "solid", 
        borderWidth: '5px', 
        borderColor: "#2AA624"
        }} variant="outlined"
      >
      <CardActionArea onClick={handleClick}>
      <CardMedia
        style={{borderStyle: "solid", borderWidth: '5px', borderColor: "#dce04f"}} 
        component="img"
        height="500px"
        width="500px"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant ="h6">
        Written By: {author}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {`Published in ${publishDate} by ${publishedBy} from ${publishedIn}`}
      </Typography>
      <Typography>
        <strong>An excerpt from chapter 1 : </strong>{`${excerpt}...`}
      </Typography>
      <Typography>
        <a href={bookPreview} target="_blank">Click here to view the eBook in a new window!</a>
        <p> Click on the book to go to your account!</p>
      </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Homecard;