
# University Project

This is a single-page application that allows the user to look at a random selection of books available in the courses offered at the mini-school from the home page. There is functionality that allows creating an account with a teacher or student role as well as a login page to change the users' rights. There are two components, one for faculty members and one for students, that allow the user to display all books in all courses. The faculty members can assign questions to each book and the students can answer all assignments assigned to a book.
  

## Table of Contents


- [Features](#Features)

- [Installation](#installation)

- [Usage](#usage)

- [Description](#Description)

- [Instructional-GIF](#Instructional-GIF)

- [Video-Describing-Functionality](#Video-Describing-Functionality)

- [Credits](#Credits)

- [License](#License)

- [Badges](#Badges)

  

## Features

  

1. From the home page, the user can view a random book from each of the 5 English courses available from the SPA. Upon render of the home page, a new random number selects a different book from each course and displays it as a card. Clicking on each card will direct the user to the login page. Each card has a link that will direct the user **outside of the SPA** to a website with a pdf of the book.

2. The login page offers a link to a signup page. The signup page checks for a valid password and upon a successful sign up will redirect to the login page. The login page takes a username, password, and user role, then will redirect to the correct users' page, either faculty or student.

3. The faculty page lists a menu for all courses, expanding the course item will list a menu of each book in the course. Each book item in the expanded list is a link to render a card including that book's information. The information for the card is derived from the parameters of the URL. Each card allows the teacher to enter a question and submit it to the curriculum for that book.

4. The student page lists a menu for all courses, expanding the course item will list a menu of each book in the course. Each book item in the expanded list is a link to render a card including the book's information. The information for the card is derived from the parameters of the URL. Each card allows the student to list the next question assigned to the book that has not been answered. The student is then able to submit an answer to that question.

  

## Installation

  

This is a SPA that simulates a learning experience on canvas or a similar online school. Clone the repository to your machine and run the node installation command below to install the necessary dependencies.
```js
npm install
```
It is built with the React framework and must be initialized by running the following command.
```js
npm start
```
It is accessible through a local browser and the data is established on a local JSON file using relative paths. The JSON server must be started before use by running the following command.
```js
npm run server
```
Now you're ready to learn or teach at an English program in a made-up school.

Clone the repo [from Github here](https://github.com/Bambam320/phase-2-miniSchool-project)

  

## Usage

The SPA's functions are described below with imagery and code to best demonstrate their use.

***SPA Component Tree***

#### The component tree includes an index file that attaches the react app to the DOM. Then an "App" component provides context and routing for all children's elements. The first is a "NavBar" component that lists links and is parent to the "LogginIn" component. The second is the "Home" component which displays the main page and calls the "HomeCard" child which lists a card for each book provided to it. The third is the "Faculty" component which displays a menu handled by its children, "FacultyCourses" and "FacultyCoursesExpanded". "FactoryCards" is a component from a nested route that lists the book information selected. The "Student" component and its children work in the same way. The fifth component is Login which takes user input information and loads it to the context used by the entire SPA. The sixth component, "Signup" is available through a nested link in "Login" and takes in the users' information.
```
Index from the src folder
└── App from component folder
    ├── NavBar
	|   └── LoggedIn
	├── Home
	|   └── HomeCard
    ├── Faculty
	|   ├── FacultyCards
    |   |   FacultyCourses
    |   └── FacultyCoursesExpanded
    ├── Student
    |   ├── StudentCards
    |   |   StudentCourses
    |   └── StudentCoursesExpanded
	├── Login
    └── Signup
```
***Home Page***

![](images/Homepage.png  "Home Page Example")

####The following components are responsible for the Home page. Although NavBar and its child are available on every page of the SPA.
```
Index from the src folder
└── App from component folder
    ├── NavBar
	|   └── LoggedIn
	├── Home
	|   └── HomeCard
```

####The App component provides routes to all the other main components in the app. The default path at "/" will display the NavBar component and unless there is a path after the default path, then the Home component will be rendered as well. The NavBar component displays an "AppBar" material component for styling and calls 2 children components, NavBarLinks and LoggedIn. As shown above, there are 4 links returned by the NavBarLinks component. A status message that displays the current users' login information and a logout button is returned by the LoggedIn component.

```js
function  App() {
//provides context to and route to the entire app
  return (
    <LoggedUserContext.Provider  value={{ currentUser, setCurrentUser }}>
      <div  style={{ background:  'radial-gradient(#ffe6cc, #fff2e6)' }}>
		<Routes>
			{/* sets "/" to default with NavBar component and indexes home to it */}
	      <Route  path="/"  element={<NavBar  />}>
			<Route  index  element={<Home  />}  />
		    <Route  path="faculty/*"  element={<Faculty  />}  /> //root for faculty tree
			<Route  path="student/*"  element={<Student  />}  />
			{/* <Route path="explore" element={<Explore />} /> */}
			<Route  path="login"  element={<Login  />}  />
			<Route  path="signup"  element={<Signup  />}  />
		  </Route>
		</Routes>
	  </div>
	</LoggedUserContext.Provider>
  )
}
```

####The Home component uses the effect hook to build an array where it grabs a random book from each course passed to the forEach() method used. That book array is then used to render the HomeCard component.

```js
const  eng101 = ['OL4444289M', 'OL32520899M', 'OL24777120M', 'OL26639962M', 'OL39222415M']
const  courses = ["eng101", "eng202", "eng303", "eng404", "eng505"]
/Grab a random book from each course and push it to an array which sets the card state
useEffect(() => {
  const  host = `http://localhost:3001/`
  let  bookarray = []
  courses.forEach((course) => {
    fetch(`${host}${course}`)
      .then((r) =>  r.json())
      .then((data) => {
        bookarray.push(data[Math.ceil(Math.random() * 4)])
        if (bookarray.length === 5) {
          return  setCardState(bookarray, course)
        }
      })
  })
}, [])
```
####The Homecard component is called for each card in the array. Then Homecard uses several variables and the Card and Typography components from Material UI to display the information provided.

```js
const  listBooks = cards.map((card, i) => {
  return (card ?
    <Grid  item={4}>
      <Homecard  key={i}  card={card}  />
    </Grid>
  })
```

***Faculty page***

![](images/Faculty.png  "Faculty Page Example")

####The faculty branch of the app.
```
    ├── Faculty
	|   ├── FacultyCards
    |   |   FacultyCourses
    |   └── FacultyCoursesExpanded
```
####The next main branch of components begins with Faculty, rendered when path matches "/faculty", it returns a list in the main container that calls ```{listCourses}``` . That will render a FacultyCourses component for each course available on the server which is displayed as an expandable item in a list. Then FacultyCourses will call FacultyCoursesExpanded which displays a list item for each book in that course.

```js
return (
  <>
  {currentUser && currentUser.role === 'professor' ?
    <Container  style={{ marginTop:  '100px', marginBottom:  '100px' }}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader  component="div"  id="nested-list-subheader">
            Your courses!
          </ListSubheader>
        }
        className={classes.root}
      >
      {listCourses}
      </List>
      <Routes>
        <Route  path=":course/:bookId/:jsonId"  element={<FacultyCards  />}  />
      </Routes>
    </Container>
  : currentUser && currentUser.role === 'student' ? 
  <h3  style={{ marginTop:  '100px' }}>Get out of here, you're here to learn!</h3> : 
  <h3  style={{ marginTop:  '100px' }}>Please login to view this content!</h3>}
  </>
)
```

####Each item in the expanded list of books is a link, for each list item that is returned by FacultyCoursesExpanded, a link component is added to it. When that item is clicked, it will create a URL with 3 parameters, the course that the book belongs to, the open library API id of the boo,k, and the id of the book from the JSON server. That path is routed to, in the above Route component from ```react-router-dom``` where each parameter is to be available to the useParams hook in the FacultyCards element that is rendered.

 ```js
function  handleSubmit(e) {
  e.preventDefault()
  const  questionId = book.questions.length + 1
  const  questions = book.questions.push({ id:  questionId, question:  formValues, answer:  '')}
  const  putBook = Object.assign(book, questions)
  const  put = {
    method:  'PUT',
    headers: {
      "Content-Type":  "application/json",
      "Accept":  "application/json"
    },
    body:  JSON.stringify(putBook)
  }
  fetch(`http://localhost:3001/${course}/${id}`, put)
    .then((r) =>  r.json())
    .then((data) =>  clearForm(data))
  setSnackOpen(true)
}
```

####The FacultyCards component provides some information about the selected book and provides a text field and button to allow the faculty member to enter a question and submit it. The ```handleSubmit``` function above takes the value entered in the text field through the ```formValues``` state. It creates an object and pushes it to the current array of questions in the book state variable. The book state is set as an effect of loading the FacultyCards component. The effect will also rerun every time the params are changed so the book variable holds the currently appropriate data. The book that is stored on the JSON server is replaced with a new object created by assigning a variable with the book from a state with its array of questions updated.

***Student page***

![](images/Student.png  "Student Page Example")

####The Student branch of the app.
```
    ├── Student
    |   ├── StudentCards
    |   |   StudentCourses
    |   └── StudentCoursesExpanded
```
####The next branch uses the parent component Student, it's almost identical to the faculty branch. It is rendered when the path of the URL matches "/student", it also renders its child component, StudentCourses which in turn renders its child component, StudentCoursesExpanded. This makes the same list of books in each course stored on the JSON server available to the user in the expandable menu list. There are some differences and one of those is described below.

```js
const  handleClick = () => {
  let  ques = {}
  if (book.questions.length > 1) {
    ques = book.questions.find((question) =>  question.question !== '' && question.answer === '')
  } else  if (book.questions.length === 1) {
    ques = {question:  'No assignments found for this book'}
  }
  setQuestion(ques === undefined ? 'All assignments have been completed for this book' : ques.question)
  setShowQuestion(true)
}
```

####The book card available to the student renders a text field, a text display field, and a button that will return the ```handleClick``` function above. The JSX for it is shown below, where the ```{question}``` is only shown if a ```showQuestion``` state variable holding a boolean is true. In ```handleClick``` the current length of the questions array pertaining to the book displayed in the card is measured and the first question is skipped if there is more than one question.  It then finds the question in the array of questions that don't have an answer, then the local ques variable is filled with that question. The state variable holding the question returned by the ```.find()``` is updated with the new question and it will be displayed when the showQuestion boolean is set to true.

```js
<Button  style={{ backgroundColor:  'lightgreen' }}  onClick={handleClick}>
  Get new assignment!
</Button>
{showQuestion ? <p>{question}</p> : <p></p>}
<form  onSubmit={handleSubmit}>
<TextareaAutosize
  style={{ width:  460 }}
  maxRows={20}
  aria-label="maximum height"
  placeholder="Write Answers here."
  defaultValue="Answering..."
  value={formValues}
  onChange={handleInputChange}
/>
```

***Login page***

![](images/Login.png  "Login Page Example")

![](images/Signup.png  "Signup Page Example")

####The faculty branch of the app.
```
	├── Login
    └── Signup
```

####The login and signup pages are styled similarly save for an additional text field shown on the signup page that mimics a mainstreams website password validation process. Their function differs in several ways. The Signup component which renders when a link from the Login component is clicked,  will take the input information and validate that the passwords match and a role is selected and will add it to the JSON server with a POST method. The ```handleSignupSubmit``` function below will perform a fetch with a POST method to add the users' information to the login JSON and then clear the input form if valid. If the signup information was invalid, a Dialog component from the Material UI will display an error message. If the login information was valid, another function ```cleanUpForm``` function will be called that will clear the input forms, set a SnackBar component to open, run a timeout method to navigate to the appropriate page in a few seconds and sets the state with the login users name and role to use for the SnackBar component.

```js
const  handleSignupSubmit = (event) => {
  event.preventDefault();
  const  post = {
    method:  'POST',
    headers: {
      "Content-Type":  "application/json",
      "Accept":  "application/json"
    },
    body:  JSON.stringify(formValues)
  }
  if (formValues.password === formValues.passwordAuth && formValues.password !== '') {
  fetch(`http://localhost:3001/login`, post)
    .then((r) =>  r.json())
    .then((data) => (data))
  return  cleanUpForm(formValues.username, formValues.role)
  } else  if (formValues.password !== formValues.passwordAuth) {
    return  handleDialog()
  } else  return  null
};
```

####The login page uses a GET method to compare the state held ```formValues``` variable containing the username, password, and role of the users' input information to all the objects containing the currently stored users from the JSON servers login location. The switch case statement calls functions depending on who the user is and if it is a valid credential. It also clears the input login form. Both the ```professorLogin``` and ```studentLogin``` functions operate the same but send the user to their role appropriate areas of the SPA. They both navigate the user to their appropriate page, create a SnackBar and set the context held state variable with the currently logged-in user's information. This information is used by several other components including the LoggedIn component.

```js
const  handleLoginSubmit = (event) => {
  event.preventDefault();
  fetch(`http://localhost:3001/login`)
    .then((r) =>  r.json())
    .then((loginCredentials) => {
  let  validCred = loginCredentials.find((loginCred) => (loginCred.username === formValues.username && (loginCred.password === formValues.password && (loginCred.role === formValues.role))))
  switch (true) {
    case  validCred && validCred.role === 'professor': professorLogin(validCred)
    break;
    case  validCred && validCred.role === 'student': studentLogin(validCred)
    break;
    case  validCred === undefined : falseLogin()
    break;
    default: return  null
  }
})
setFormValues(defaultValues)
};
```

## Description

  

- I chose the openLibrary API because each book had the perfect kind of information that I could use to build, "courses" in the mini-school SPA. I had to add some additional information to it to fit the needs of assigning questions and answers to each book. 

- The client-side routing involved in this SPA was mostly educational. The nested routes were not required but they proved to be very valuable in supporting the mental model I now have of them. I also had to react-router version 6 because version 5 was not compatible with the framework. That proved to be another challenge as several changes were made between versions 5 and 6 which changed which components I would import from the router.

- This SPA uses the Material UI framework which makes it the best-looking website that I have ever created. I used some of the readily available examples from the Material ui docs and altered some of them because I needed additional styling or functionality. Using the API docs for components to obtain the correct props was a great learning experience.

- I chose to use the GET, POST and PATCH HTTP methods to provide all of the functionality in assigning information to a JSON object. The teacher can create a question and POST it as a new object while a student can PATCH the answer to that question to the same object where the question was declared.

- This SPA uses all of the information I've recently learned in Phase 2 to provide a teaching and learning experience using several hooks, routes, and components.

  

## Instructional-GIF

  

![](https://media.giphy.com/media/rxZyUNxOXo4931Kz0m/giphy.gif)

***Home page - Random display of books upon render***

![](https://media.giphy.com/media/zuFx44MqNcNNLXbIad/giphy.gif)

***Student Page***

![](https://media.giphy.com/media/vgHoLpt9wv5i3AC8fK/giphy.gif)

***Faculty Page***

![](https://media.giphy.com/media/L6pS8flfljDxcctiJo/giphy.gif)
  
***Posting a question as a teacher and answering it as a student***

![](https://media.giphy.com/media/a1ch0WzeCCN97wfyYn/giphy.gif)

***Login page - On successful login, render role appropriate work page***

![](https://media.giphy.com/media/nNNAXRqcfNxJonwRQI/giphy.gif)

  ***Signup Page***


## Video-Describing-Functionality

    
   [![Watch the video](https://i.imgur.com/EolkAcU.png)](https://youtu.be/093kWJALBUU)

  

## Credits

This project uses the free API from [openLibrary](https://openlibrary.org/developers)

## License

MIT License
Copyright (c) 2022 Igor M.  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, E ,AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGE, S OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TOR  ,T OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  

## Badges

  

![](https://img.shields.io/github/commit-activity/w/Bambam320/phase-2-miniSchool-project)