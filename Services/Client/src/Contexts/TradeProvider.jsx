import React, { createContext, useContext, useState } from 'react'
export const TradeContext= createContext();


const TradeProvider = ({ children }) => {
    const [currCoin, setcurrCoin] = useState(0)
    const coins= [
        {
            coinName: 'Btc . USDT',
            price: '760299.2 USDT',
        },
        {
            coinName: 'Eth . USDT',
            price: '7699.2 USDT',
        },
        {
            coinName: 'Sol . USDT',
            price: '60299.2 USDT',
        },
        {
            coinName: 'Doge . USDT',
            price: '799.2 USDT',
        },
        {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        },
        {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        },
         {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        }, {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        }, {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        },
         {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        }, {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        },
         {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        }, {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        }, {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        },
        {
            coinName: 'Shiba . USDT',
            price: '760.2 USDT',
        },
       
    ]

    const value= {
        currCoin,
        setcurrCoin,
        coins
    };
  return (
    <TradeContext.Provider value={value}>
        {children}
    </TradeContext.Provider>
  )
}

export default TradeProvider

export const useTrade =()=>{
    const context = useContext(TradeContext)
    if(!context){
        throw new Error('useTrade must be used within a TradeProvider')
    }
    return context
}