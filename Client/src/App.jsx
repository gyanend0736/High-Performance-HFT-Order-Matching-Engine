import React from 'react'
import MainNav from './Components/Navigation/MainNav'
import Home from './Pages/Home'
import About from './Pages/About'

const App = () => {
  return (
    <div className=''>
        <MainNav/>
        <Home/>
        <About/>
    </div>
  )
}

export default App