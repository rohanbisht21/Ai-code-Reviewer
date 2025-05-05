const express = require('express');
const aiRoutes = require('./routes/ai.routes')


const app = express() //server is created


app.use(express.json());


app.post('/',(req,res) =>{ //dummy route
    res.send('hello World')
})

app.use('/ai',aiRoutes)

module.exports= app;