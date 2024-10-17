// 1. load .env file
require('dotenv').config()

// 2 import express
const express= require("express")

// 3 import cors
const cors =require('cors')

// 10. import router
const router= require('./Routes/router')

// 9 import db
require('./DB/connection')

const applicationMiddleware=require('./Middleware/applicationMiddleware')

// 4.create application using express
const pfServer=express()


// 5 use
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(applicationMiddleware)
pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))
// 6 define Port
const PORT=3000 || process.env.PORT

// 7 define listen
pfServer.listen(PORT,(req,res)=>{
    console.log("pfServer started at port",PORT);
    
})

// 8 define client
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Project Fair Server started... Waiting for Client Request</h1>`)
})