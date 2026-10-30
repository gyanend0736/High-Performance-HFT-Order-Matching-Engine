import React, { useState } from 'react'
import { useTrade } from '../../../Contexts/TradeProvider'

const CoinListItem = ({idx, c}) => {
  const coin= JSON.parse(c)
  const {currCoin, setcurrCoin}= useTrade()

  const coinName=coin.symbol;
  const coinPrice=Number(coin.quote[0].price.toFixed(2))
  return (
    <div className=''>
        <button 
          className={`w-full ${(currCoin==idx)? "bg-[#0d1016]": "bg-[#151928]"} p-2`}
          onClick={()=>{setcurrCoin(idx)}}
        >
            <div className='grid grid-cols-[2fr_1fr]'>
                <div className='text-start px-2 whitespace-nowrap text-[60%]'><p>{coinName}</p><p>{coinPrice}</p></div>
                <div className='p-1'><div className='w-full h-full bg-blue-500'></div></div>
            </div>
            
        </button>
        <hr className="border-t border-gray-400 " />
    </div>
  )
}

export default CoinListItem