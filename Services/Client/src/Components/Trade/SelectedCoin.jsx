import React from 'react'
import { useTrade } from './TradeProvider'

const SelectedCoin = () => {
  const {currCoin, coins} = useTrade()
  const coinName= coins[currCoin].coinName
  const price= coins[currCoin].price
  return (
    <div className='my-1 flex bg-[#2e303f] text-white'>
      <div className=' w-1/5 '>
        <p>{coinName}</p>
        <p>{price}</p>
      </div>
      <div className='bg-[#161929] w-4/5'>

      </div>
    </div>
    
  )
}

export default SelectedCoin