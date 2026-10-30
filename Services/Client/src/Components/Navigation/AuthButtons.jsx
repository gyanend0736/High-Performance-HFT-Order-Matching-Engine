import React from 'react'

const AuthButtons = ({type,color}) => {

  return (
    <div 
      style={{backgroundColor: color}}
      className={`rounded-sm ${(type=="Login")?'bg-gray-400 text-blue-700 ml-4 ':'text-white' }`}>
      <button className='shrink-0 px-6 py-1 whitespace-nowrap'>
      <a href="http://10.237.225.65:3000">
        {type}
      </a>
        
      </button>
    </div>
  )
}

export default AuthButtons