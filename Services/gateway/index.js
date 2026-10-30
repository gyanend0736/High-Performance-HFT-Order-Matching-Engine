const express= require('express');
const cors= require('cors');
const PORT = 3000;
const traderoutes= require('./routes/traderoutes');

const app= express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/trade', traderoutes);

app.listen(PORT, ()=>{
    console.log(`app is listening on ${PORT}`)
})