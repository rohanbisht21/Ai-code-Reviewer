const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express() //server is created

app.use(cors())
app.use(express.json());


app.get('/',(req,res) =>{ //dummy route
    res.send('hello World')
})

app.use('/ai',aiRoutes)

module.exports= app;