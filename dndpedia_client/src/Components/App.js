//functional imports
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { LoggedContext } from './LoggedContext'


//component and required file imports
import '../index.css';
import Background from './Background';
import NavBar from './NavBar';
import Home from './Home';
import Spells from './Spells';
import Characters from './Characters'
import CreateACharacter from './CreateACharacter';
import Fight from './Fight';


function App() {
  const [myFighter, setMyFighter] = useState({
    card: {
      name: ''
    }
  })
  const [opponent, setOpponent] = useState({
    card: {
      name: ''
    }
  })

  console.log(opponent)
  console.log(myFighter)

  //provides context to and route to entire app
  return (
    <LoggedContext.Provider value={{ opponent, setOpponent, myFighter, setMyFighter }}>
        <Background />
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index path="home/" element={<Home />} />
            <Route path="spells/" element={<Spells />} />
            <Route path="characters/" element={<Characters />} />
            <Route path="create_a_character/" element={<CreateACharacter />} />
            <Route path="fight/" element={<Fight />} />
          </Route>
        </Routes>
      </LoggedContext.Provider>
  )
}

export default App;