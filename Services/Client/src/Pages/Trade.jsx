import React, { useContext } from 'react'
import TradeProvider from '../Contexts/TradeProvider'
import TradeNav from '../Components/Trade/TradeHeader'
import TradeHeader from '../Components/Trade/TradeHeader'
import MarketHeader from '../Components/Trade/MarketHeader'
import CoinList from '../Components/Trade/ListCoins/CoinList'
import PriceChart from '../Components/Trade/TradeChart/PriceChart'
import OrderBookPanel from '../Components/Trade/TradeHistory/OrderBookPanel'


const Trade = () => {
  

  return (
    <TradeProvider>
      <div className='bg-[#0d1016] w-screen h-screen flex flex-col overflow-hidden px-2'>
        <TradeHeader/>
        <MarketHeader/>
        <div className='flex-1 overflow-hidden grid grid-cols-[1fr_3fr_1fr] '>
          <CoinList/>
          <PriceChart/>
          <OrderBookPanel/>
        </div>
      </div>
      
    </TradeProvider>
    
  )
}

export default Trade