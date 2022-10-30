//functional imports
import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'
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
import CharacterSpells from './CharacterSpells'
import UpdateCharacter from './UpdateCharacter';


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
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/characters')
      .then((r) => r.json())
      .then((data) => console.log(data))
  }, [])

  //provides context to and route to entire app
  return (
    <LoggedContext.Provider value={{ opponent, setOpponent, myFighter, setMyFighter, characters, setCharacters }}>
      <Background />
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="characters/" element={<Characters />} >
            <Route path=":id/spells" element={<CharacterSpells />} />
            <Route path=":id/update" element={<UpdateCharacter />} />
          </Route>
          <Route path="spells/" element={<Spells />} />
          <Route path="create_a_character/" element={<CreateACharacter />} />
          <Route path="fight/" element={<Fight />} />
        </Route>
      </Routes>
      
    </LoggedContext.Provider>
  )
}

export default App;