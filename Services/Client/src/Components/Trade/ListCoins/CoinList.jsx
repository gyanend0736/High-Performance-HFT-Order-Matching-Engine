
import { useTrade } from '../../../Contexts/TradeProvider'
import CoinListItem from './CoinListItem'

const CoinList = () => {
   const {coinData}= useTrade();  

  return (
    
    <div className='h-full overflow-scroll scrollbar-none text-white/80 '>
        
        {
            coinData.map((coin,idx)=>{
                return <CoinListItem idx={idx} c={JSON.stringify(coin)} />

            })
        }
    </div>
  )
}

export default CoinList