import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const NavItem = (props) => {
 
  return (
    <div className='whitespace-nowrap ml-[4%] text-[80%]'>
      <Link to={`/${props.item}`}>{props.item}</Link>
    </div>
  )
}

export default NavItem