import React from 'react'
import Listcoins from '../Components/Trade/ListCoins/Listcoins'
import TradeHistory from '../Components/Trade/TradeHistory/TradeHistory'
import TradeProvider from './TradeProvider'
import SelectedCoin from '../Components/Trade/ListCoins/SelectedCoin'

const Trade = () => {
  return (
    <TradeProvider>
      <div className='bg-black w-screen overflow-hidden h-screen  px-2'>
        <SelectedCoin/>
        <div className='flex'>
          <Listcoins/>
          <TradeHistory/>
        </div>
      </div>
      
    </TradeProvider>
    
  )
}

export default Trade