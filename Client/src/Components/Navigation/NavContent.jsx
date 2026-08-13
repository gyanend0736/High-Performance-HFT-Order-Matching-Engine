import React from 'react'
import Navitem from './Navitem'
import Signbuttons from './Signbuttons'
import Logo from './Logo'

const NavContent = () => {
     const navitems= [
        "Trade",
        "Future",
        "Options",
        "Learn",
        "Business", 
        "About us",
        "Support"
    ]
  return (
    <div className='w-full h-2/3 bg-white/30 backdrop-blur-md justify-between flex items-center px-[2%] py-[1%] '>
        <div className='flex  font-semibold'>
            <Logo/>
            
                {navitems.map((item)=>{
                return <Navitem item={item}/>
            })}
            
            
        </div>
        <div className='flex  font-light'>
            <Signbuttons type={"Create Account"}/>
            <Signbuttons type={"Login"}/>
        </div>
        
        
    </div>
  )
}

export default NavContent