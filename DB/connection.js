// 1. import  mongoose
const mongoose = require('mongoose')

// 2 Create a contion string
const connection_string=process.env.CONNECTION_STRING 

// 3 connect to database
mongoose.connect(connection_string).then((res)=>{
    console.log("mongoose connection established with pfserver");
    
}).catch((err)=>{
    console.log("mongdb connection error:"+err);
    
})