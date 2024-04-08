import React, { useState } from 'react'
import './App.css'
import Nav from './components/nav'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Complete from './components/complete'
import profile from './components/profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/complete' element={<Complete/>}/>
          {/* <Route path='/' element={<login/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App