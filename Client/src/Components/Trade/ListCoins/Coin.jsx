import React, { useState } from 'react'
import { useTrade } from '../../../Pages/TradeProvider'

const Coin = ({idx, c}) => {
  const coin= JSON.parse(c)
  const {currCoin, setcurrCoin}= useTrade()
  
  return (
    <div className=''>
        <button 
          className={`w-full ${(currCoin==idx)? "bg-black": "bg-gray-700"} p-2`}
          onClick={()=>{setcurrCoin(idx)}}
        >
            <div className='grid grid-cols-[2fr_1fr]'>
                <div className='text-start px-2 whitespace-nowrap text-[60%]'><p>{coin.coinName}</p><p>{coin.price}</p></div>
                <div className='p-1'><div className='w-full h-full bg-blue-500'></div></div>
            </div>
            
        </button>
        <hr className="border-t border-gray-400 " />
    </div>
  )
}

export default Coin