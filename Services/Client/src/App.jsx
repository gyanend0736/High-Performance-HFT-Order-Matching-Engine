import React from 'react'
import MainNav from './Components/Navigation/MainNav'
import Home from './Pages/Home'
import About from './Pages/About'
import { Route, Routes } from 'react-router-dom'
import Trade from './Pages/Trade'
import NavContent from './Components/Navigation/NavContent'

const App = () => {
  return (
    <div className=''>
        
        <Routes>
          <Route path='/' element={<><MainNav/><Home/></>}/>
          <Route path='/trade' element={<><Trade/></>}/>
        </Routes>
        
    </div>
  )
}

export default App