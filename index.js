const express= require('express');
require('dotenv').config()
const app=express();

app.get('/',(req,res)=>{
    res.send('hello world')
});

const PORT=process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log('your app is running on '+ PORT);
});