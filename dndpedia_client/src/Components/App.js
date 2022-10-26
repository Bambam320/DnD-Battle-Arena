//functional imports
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { LoggedUserContext } from './LoggedUserContext'

//component and other file imports
import '../index.css';
import Home from './Home';
import Faculty from './Faculty';
import NavBar from './NavBar';

function App() {
  const [currentUser, setCurrentUser] = useState('')

  //provides context to and route to entire app
  return (
    <LoggedUserContext.Provider value={{ currentUser, setCurrentUser }}>

        <Routes>
          {/* sets "/" to default with NavBar component and indexes home to it */}
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="spells/*" element={<Spells />} />
            <Route path="characters/*" element={<Characters />} />
            <Route path="create_a_character/*" element={<CreateACharacter />} />
            <Route path="fight/*" element={<Fight />} />
          </Route>
        </Routes>

    </LoggedUserContext.Provider>
  )
}

export default App;