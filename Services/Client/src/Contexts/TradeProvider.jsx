import React, { createContext, useContext, useState,useEffect } from 'react'

export const TradeContext= createContext();


const TradeProvider = ({ children }) => {
    const [currCoin, setcurrCoin] = useState(0)
    const [coinData, setCoinData] = useState([])

    
    const value= {
        currCoin,
        setcurrCoin,
        coinData,
        setCoinData,
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