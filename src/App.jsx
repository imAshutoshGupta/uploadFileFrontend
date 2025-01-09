import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LogIn from './components/LogIn'
import NavbarAll from './components/NavbarAll'
import HomePage from './components/Home'
import Dashboard from './components/Dashboard'
import SignUp from './components/Signup'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarAll />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
