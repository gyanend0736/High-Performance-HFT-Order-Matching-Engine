import React from 'react'
import TradeSummary from './OrderBookRows'

import BuySellToggle from './BuySellToggle'
import OrderBookRows from './OrderBookRows'

const OrderBookPanel = () => {
  return (
    <div className= 'text-white flex-col h-full max-h-[100%]'>
      <header className='flex justify-between whitespace-nowrap'>
          <button className='p-1'>Order Books</button>
          <button className='p-1'>Trade History</button>
      </header>
      <div className='h-[calc(100%-7rem)]'>
        <OrderBookRows type={"Buy"}/>
        <OrderBookRows type= {"Sell"}/>      
      </div>
     <BuySellToggle/>
    </div>
  )
}

export default OrderBookPanel