import React from 'react'
import Listcoins from '../Components/Trade/ListCoins/Listcoins'
import TradeProvider from '../Components/Trade/TradeProvider'
import SelectedCoin from '../Components/Trade/SelectedCoin'
import TradeNav from '../Components/Trade/TradeNav'
import TradeChart from '../Components/Trade/TradeChart/TradeChart'
import TradeMain from '../Components/Trade/TradeHistory/TradeMain'

const Trade = () => {
  return (
    <TradeProvider>
      <div className='bg-[#0d1016] w-screen h-screen flex flex-col overflow-hidden px-2'>
        <TradeNav/>
        <SelectedCoin/>
        <div className='flex-1 overflow-hidden grid grid-cols-[1fr_3fr_1fr] '>
          <Listcoins/>
          <TradeChart/>
          <TradeMain/>
        </div>
      </div>
      
    </TradeProvider>
    
  )
}

export default Trade