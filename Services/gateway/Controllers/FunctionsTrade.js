const CMC_API= process.env.CMC_API_KEY;
const baseUrl = "https://api.binance.com";



async function handlegetCoinList(req, res) {
  const url = new URL(
    "https://pro-api.coinmarketcap.com/v3/cryptocurrency/listings/latest",
  );
  url.search= new URLSearchParams({
    start: '1',
    limit: '10',
    convert: 'USD'
  })
  

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-CMC_PRO_API_KEY": CMC_API,
 
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  res.send(data)
}

async function handlegetLastTrade(req, res){
  const url= new URL(
    baseUrl+ "/api/v3/trades"
  );
  url.search= new URLSearchParams({
    symbol: req.query.id,
    limit: '1'
  });
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    }
   
  });
  if(!response.ok){
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  const data= await response.json();
  res.send(data);

}

async function handlegetOrderBook(req, res){
  const url = new URL(
    baseUrl+ "/api/v3/depth"
  );
  url.search= new URLSearchParams({
    symbol: req.query.id,
    limit: '5'
  });
  const response = await fetch(url, {
    headers: {
      Accept: "appliction/json"
    }
  })
  if(!response.ok){
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }
  const data= await response.json();
  res.send(data);
}

async function handlegetCandlestickData(req, res){
  const url = new URL(
    baseUrl+ "/api/v3/klines"
  );
  url.search = new URLSearchParams({
    symbol: req.query.id,
    interval: '1m',
    limit: '5'
  });
  const response= await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  if(!response.ok){
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  res.send(data);
}



module.exports= {
  handlegetCoinList,
  handlegetLastTrade,
  handlegetOrderBook,
  handlegetCandlestickData
}