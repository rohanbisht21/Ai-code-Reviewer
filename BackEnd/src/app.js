const express = require('express');


const app = express() //server is created

app.get('/',(req,res) =>{ //dummy route
    res.send('hello World')
})

module.exports= app;