// steps to define express server

// Loads .env file contents into process.env

require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./database/dbConnection')


const pfServer=express()


pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`PFSERVER STARTED AT PORT ${PORT} AND WAITING FOR CLIENT REQUEST`)
})

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">PFSERVER STARTED AT PORT AND WAITING FOR CLIENT REQUEST<h1/>`)
})

