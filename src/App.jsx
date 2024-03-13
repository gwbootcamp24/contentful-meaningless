import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Collection from './components/Collection'
import Twitchtest from './components/Twitchtest'
import Navbar from './ui/Navbar'
import Home from './pages/Home'
import CreateEntryTest from './pages/CreateEntryTest'
import GameLandingPage from './pages/GameLandingPage'
import './App.css'

function App() {
  const gameCategories = [
    "Point-and-click", 
    "Shooter", 
    "Fighting", 
    "Real Time Strategy (RTS)", 
    "Role-playing (RPG)", 
    "Simulator", 
    "Turn-based strategy (TBS)", 
    "Sport", 
    "Racing"
  ]
  return (
    <>
    <Navbar gameCategories={gameCategories} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/createGame' element={<CreateEntryTest />} />
      {gameCategories.map((cat) =>
        <Route path={cat} element={<Home cat={cat} />} />
      
      )}
      <Route path='/games/:gameId' element={<GameLandingPage />} />
    </Routes>

       {/* <Collection /> */}
       {/* <Twitchtest /> */}
     </>
  )
}

export default App


 
