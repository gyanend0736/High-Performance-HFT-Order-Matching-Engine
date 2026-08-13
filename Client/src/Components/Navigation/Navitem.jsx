import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Navitem = ({item}) => {
 
  return (
    <div className='whitespace-nowrap ml-[4%] text-[80%]'>
      <Link to={`/${item}`}>{item}</Link>
    </div>
  )
}

export default Navitem