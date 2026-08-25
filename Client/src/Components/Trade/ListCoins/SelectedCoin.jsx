import React from 'react'
import { useTrade } from '../../../Pages/TradeProvider'

const SelectedCoin = () => {
  const {currCoin, coins} = useTrade()
  const coinName= coins[currCoin].coinName
  const price= coins[currCoin].price
  return (
    <div className='my-1 bg-gray-600'>
        <p>{coinName}</p>
        <p>{price}</p>
    </div>
  )
}

export default SelectedCoin