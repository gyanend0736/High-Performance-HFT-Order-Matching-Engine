import Logo from '../Navigation/Logo'
import AuthButtons from '../Navigation/AuthButtons'
import { useTrade } from '../../Contexts/TradeProvider'
// import { fetchCoinData } from '../../Contexts/handletradeapiRequests'
import { useEffect } from 'react'

const TradeHeader = () => {
  const { coinData, setCoinData} = useTrade()
   useEffect(()=>{
        const fetchCoinData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/trade/');
                if (!response.ok) {
                    throw new Error('Failed to fetch coin data');
                }
                const data = await response.json();
                console.log('Fetched coin data:', data);
                setCoinData(data.data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchCoinData();
        
    },[])
     
  return (
    <div className='flex justify-between p-2 bg-[#151928]'>
        <Logo/>
        <div className='flex'>
            <AuthButtons type={"Register"} color={'orange'}/>
            <AuthButtons type={"Login"} />
        </div>
        
    </div>
  )
}

export default TradeHeader