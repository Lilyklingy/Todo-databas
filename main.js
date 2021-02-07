const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/userrouter")
const bodyparser = require("body-parser")
const router = require("./routes/todoRoute")
require("dotenv").config(); 
const app = express()
app.use(express.static( __dirname + "/pubilc")) 
app.use(bodyparser.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.use("/", router)
app.use("/", userRouter)
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