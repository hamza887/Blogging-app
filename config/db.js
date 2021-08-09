const mongoose = require('mongoose');
require('dotenv').config();
module.exports= connect = async ()=>{
    try {
        const response= await mongoose.connect('mongodb+srv://blogging:yboXhMupx6DvQUF2@cluster0.de05m.mongodb.net/blog?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true});
        console.log('connection created');

    } catch (error) {
        console.log(error)
    }
   
}