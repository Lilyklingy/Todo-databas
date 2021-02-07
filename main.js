const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("")

mongoose.connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) =>{
        if(err) return
        app.listen(process.env.PORT || 8001,() =>{
            console.log("application is running")
        })
    })