import React from 'react'
import Logo from '../Navigation/Logo'
import Signbuttons from '../Navigation/Signbuttons'

const TradeNav = () => {
  return (
    <div className='flex justify-between p-2 bg-[#151928]'>
        <Logo/>
        <div className='flex'>
            <Signbuttons type={"Register"} color={'orange'}/>
            <Signbuttons type={"Login"} />
        </div>
        
    </div>
  )
}

export default TradeNav