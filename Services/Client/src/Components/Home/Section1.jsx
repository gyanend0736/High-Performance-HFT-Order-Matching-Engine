import React from 'react'
import Signbuttons from '../Navigation/Signbuttons'

import { useEffect, useState} from 'react'
const Section1 = () => {
    const words=["Trade", 'Learn', 'Invest']
  const [word, setword] = useState(0)
  useEffect(() => {
    const interval= setInterval(() => {
        setword((prevInd)=>(prevInd+1)%words.length)
    }, 2000);
  
    return () => {
      clearInterval(interval);
    }
  }, [words.length])
  
  return (
    <div className='w-full h-full flex '>
        <div className='w-1/2 h-full relative '>
            <div className='text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <p className='text-4xl font-semibold'>
                India Ka Crypto coach !
                </p>
                <p className='text-gray-500 text-sm'><span>Trusted by 2 Cr+ Users to</span> <span className='text-blue-500 transition-all duration-500'>{words[word]}</span> Crypto </p><br />
                <Signbuttons type='Create Account'/>
            </div>

        </div>
        <div className='w-1/2 h-full bg-amber-700'></div>
    </div>
  )
}

export default Section1