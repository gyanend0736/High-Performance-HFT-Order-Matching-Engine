import React from 'react'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <div className='mr-[10%]'><Link to={'/'}>
    <p className='text-blue-900 text-xl font-bold'>Coin<span className='text-red-600 '>DCX</span></p>
    </Link>
      
    </div>
  )
}

export default Logo