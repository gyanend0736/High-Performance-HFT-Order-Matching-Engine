const {
    handlegetCoinList, 
    handlegetLastTrade, 
    handlegetOrderBook, 
    handlegetCandlestickData 
}= require('../Controllers/FunctionsTrade');

const express= require('express');
const router= express.Router();


router.get('/', handlegetCoinList);

router.get('/lastTrade', handlegetLastTrade);

router.get('/orderbook', handlegetOrderBook);

router.get('/Candlestick', handlegetCandlestickData);







module.exports= router;