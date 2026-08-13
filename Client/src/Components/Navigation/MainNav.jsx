import React from 'react'
import NavContent from './NavContent'
import  NavCaution from './NavCaution'


const MainNav = () => {
   
  return (
    <header className='px-[1%] h-[15%] z-1 fixed w-full'>
        <NavCaution/>
        <NavContent  />
    </header>
  )
}

export default MainNav