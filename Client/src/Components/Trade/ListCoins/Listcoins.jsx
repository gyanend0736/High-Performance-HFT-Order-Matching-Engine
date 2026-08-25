import React, { useContext, useEffect, useState } from 'react'
import Coin from './Coin'
import SelectedCoin from './SelectedCoin'
import { useTrade } from '../../../Pages/TradeProvider'

const Listcoins = () => {
   const {coins}= useTrade();  

  return (
    <div className=' overflow-y-auto scrollbar-none text-white/80 w-1/5'>
        
        {
            coins.map((coin,idx)=>{
                return <Coin idx={idx} c={JSON.stringify(coin)} />
            })
        }
    </div>
  )
}

export default Listcoins