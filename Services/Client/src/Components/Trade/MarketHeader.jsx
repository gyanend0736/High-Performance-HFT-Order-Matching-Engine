import {useEffect} from 'react'
import { useTrade } from '../../Contexts/TradeProvider'


const MarketHeader = () => {
  const {currCoin, coinData} = useTrade()

  console.log(coinData[currCoin])
  const coinName= coinData[currCoin]?.name
  const price= coinData[currCoin]?.quote[0].price.toFixed(2)
  
   
  return (
    <div className='my-1 flex bg-[#2e303f] text-white'>
      <div className=' w-1/5 '>
        <p>{coinName}</p>
        <p>{price}</p>
      </div>
      <div className='bg-[#161929] w-4/5'>

      </div>
    </div>
    
  )
}

export default MarketHeader