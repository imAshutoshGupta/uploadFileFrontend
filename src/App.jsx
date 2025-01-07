import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LogIn from './components/LogIn'
import SignUp from './components/Signup'
import NavbarAll from './components/NavbarAll'

function App() {
  return (
    <>
      <NavbarAll />
      <LogIn />
      <SignUp />
    </>
  )
}

export default App
