import React from 'react'
import TradeSummary from './TradeSummary'
import OrderButton from './OrderButtons'
import OrderButtons from './OrderButtons'

const TradeMain = () => {
  return (
    <div className= 'text-white flex-col h-full max-h-[100%]'>
      <header className='flex justify-between whitespace-nowrap'>
          <button className='p-1'>Order Books</button>
          <button className='p-1'>Trade History</button>
      </header>
      <div className='h-[calc(100%-7rem)]'>
        <TradeSummary type={"Buy"}/>
        <TradeSummary type= {"Sell"}/>      
      </div>
     <OrderButtons/>
    </div>
  )
}

export default TradeMain