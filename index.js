const express = require('express');
const app= express()
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config()
const jwt=require("jsonwebtoken")
mongoose.connect(process.env.mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/v1',userRoute)
app.use('/v1',adminRoute)
app.listen(process.env.port,()=>{
    console.log(` app listening on port ${process.env.port}`)
});