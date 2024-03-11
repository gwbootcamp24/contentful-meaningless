import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Collection from './components/Collection'
import Twitchtest from './components/Twitchtest'
import Navbar from './ui/Navbar'
import Home from './pages/Home'
import GameLandingPage from './pages/GameLandingPage'
import './App.css'

function App() {
  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/games/:gameId' element={<GameLandingPage />} />
    </Routes>

       {/* <Collection /> */}
       {/* <Twitchtest /> */}
     </>
  )
}

export default App
