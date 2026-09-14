import React, { useContext, useEffect, useState } from 'react'
import Coin from './Coin'
import SelectedCoin from '../SelectedCoin'
import { useTrade } from '../TradeProvider'

const Listcoins = () => {
   const {coins}= useTrade();  

  return (
    <div className='h-full overflow-scroll scrollbar-none text-white/80 '>
        
        {
            coins.map((coin,idx)=>{
                return <Coin idx={idx} c={JSON.stringify(coin)} />
            })
        }
    </div>
  )
}

export default Listcoins