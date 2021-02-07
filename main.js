const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/userrouter")
const bodyparser = require("body-parser")//for kunna läsa ejs doby data
const router = require("./routes/todoRoute")
//const nodeSass = require("node-sass-middleware")
require("dotenv").config(); //require("dotenv/config")
const app = express()
//react, postman
//app.use(express.json())

// app.use(nodeSass(    //avkommentera den i fall ni använder sass  * Glöm ej npm paketet
//     {src: __dirname + "/scss"//path.join(__dirname, "scss"),
//     dest: __dirname + "/public/sytle"//path.join(__dirname,"public/style")
// }
    // src,  destnation))

app.use(express.static( __dirname + "/pubilc")) //man kan kontackt den här mappen , dirname är dators(jag)namn
//dirname : projektmapp / working directory
app.use(bodyparser.urlencoded({ extended: false }))
//för att kunna lägga till static files : bilder, style
app.set("view engine", "ejs")
//den kollar om det finns nån database med samma namn som man anger connection string, annars skapar database automatisk

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
//problem solving -> data structure & algorithm - tools
// freecodecamp
// code wars