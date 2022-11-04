//functional imports
import React, { useState, useEffect } from 'react';
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
import CharacterSpells from './CharacterSpells'
import UpdateCharacter from './UpdateCharacter';

function App() {

  // set state for the champion selected
  const [myFighter, setMyFighter] = useState({
    card: {
      name: '',
      id: 0
    }
  })

  //set state for the opponent selected
  const [opponent, setOpponent] = useState({
    card: {
      name: '',
      id: 0
    }
  })

  //set state with all characters and all spells
  const [characters, setCharacters] = useState([])
  const [spells, setSpells] = useState([])

  // fetches on effect, the characters with their spells 
  useEffect(() => {
    fetch('http://localhost:9292/characters')
      .then((r) => r.json())
      .then((characters) => {
        setCharacters(characters)
        // console.log('from app characters from useeffect', everything)
      })
  }, [])

  // useEffect for just all spells
  useEffect(() => {
    fetch('http://localhost:9292/spells')
      .then((r) => r.json())
      .then((spells) => {
        setSpells(spells)
      })
  }, [])

  //provides context for state declared above to all components and creates routes to match links that render the correct components
  return (
    <LoggedContext.Provider value={{ opponent, setOpponent, myFighter, setMyFighter, characters, setCharacters, spells, setSpells }}>
      <Background />
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="characters/" element={<Characters />} >
            <Route path=":id/spells" element={<CharacterSpells />} />
            <Route path=":id/edit" element={<UpdateCharacter />} />
          </Route>
          <Route path="spells/" element={<Spells />} />
          <Route path="characters/new" element={<CreateACharacter />} />
          <Route path="characters/fight" element={<Fight />} />
        </Route>
      </Routes>
    </LoggedContext.Provider>
  )
};

export default App;