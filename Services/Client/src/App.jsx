import React from 'react'

import Home from './Pages/Home'
import About from './Pages/About'
import { Route, Routes } from 'react-router-dom'
import Trade from './Pages/Trade'
import Header from './Components/Navigation/Header'


const App = () => {
  return (
    <div className=''>
        
        <Routes>
          <Route path='/' element={<><Header/><Home/></>}/>
          <Route path='/trade' element={<><Trade/></>}/>
        </Routes>
        
    </div>
  )
}

export default App