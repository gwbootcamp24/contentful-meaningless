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
    <br />
    <Routes>
      <Route key="home" path='/' element={<Home />} />
      <Route key="CreateEntryTest" path='/createGame' element={<CreateEntryTest />} />
      {gameCategories.map((cat,index) =>
        
        <Route key={index} path={cat} element={<Home cat={cat} />} />
        
      )}
      <Route path='/games/:gameId' element={<GameLandingPage />} />
    </Routes>

       {/* <Collection /> */}
       {/* <Twitchtest /> */}
     </>
  )
}

export default App


 
{/* <section>
	<div class="row">
    <div class="col-md-4 col-sm-6 col-xs-12">
			<div class="card">
				<div class="cover item-a">
					<h1>Little<br/>Bonsai</h1>
					<span class="price">$79</span>
					<div class="card-back">
						<a href="#">Add to cart</a>
						<a href="#">View detail</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-6 col-xs-12">
			<div class="card">
				<div class="cover item-b">
					<h1>Tropical<br/>Leaf</h1>
					<span class="price">$35</span>
					<div class="card-back">
						<a href="#">Add to cart</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-6 col-xs-12">
			<div class="card">
				<div class="cover item-c">
					<h1>Marijuana<br/>Chill</h1>
					<span class="price">$155</span>
					<div class="card-back">
						<a href="#">Add to cart</a>
					</div>
				</div>
			</div>
		</div>
    <div class="col-md-4 col-sm-6 col-xs-12">
			<div class="card">
				<div class="cover item-a">
					<h1>Little<br/>Bonsai</h1>
					<span class="price">$79</span>
					<div class="card-back">
						<a href="#">Add to cart</a>
						<a href="#">View detail</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-6 col-xs-12">
			<div class="card">
				<div class="cover item-b">
					<h1>Tropical<br/>Leaf</h1>
					<span class="price">$35</span>
					<div class="card-back">
						<a href="#">Add to cart</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-6 col-xs-12">
			<div class="card">
				<div class="cover item-c">
					<h1>Marijuana<br/>Chill</h1>
					<span class="price">$155</span>
					<div class="card-back">
						<a href="#">Add to cart</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section> */}
