const express = require('express')
const admin = require('./route/admin')
const user = require('./route/user')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
let port = process.env.PORT
const logger = require('morgan')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'))

app.use(cors({origin:"http://localhost:3000",methods:['get','post','patch','delete'],credentials:true}))

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://0.0.0.0:27017/courseStudy').then(()=>{
    console.log("MongoDb database connected")
}).catch((err)=>{
    console.log(err)
})
app.use('/', user)
app.use('/admin', admin)

app.listen(port , ()=>{
    console.log(`Server started at ${port}`)
})
