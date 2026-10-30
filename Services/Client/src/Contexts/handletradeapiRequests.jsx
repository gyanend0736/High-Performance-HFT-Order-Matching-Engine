


export const fetchCoinData= async ()=>{
        const response= await fetch('http://localhost:3000/api/trade/');
        if(!response.ok) {
            throw new Error('Failed to fetch coin data');
        }
        const data = await response.json();
        
        return data;
}