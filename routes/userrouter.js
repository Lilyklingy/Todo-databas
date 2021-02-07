const express = require("express")
const mongoose = require("mongoose")
const User = require("../model/user")
const router = express.Router()
const errors = " ";
router.get("/register",(req,res)=>{
    res.render("register.ejs",{errors})
})
router.post("/register", async (req,res)=>{
    //req.body
    const errors = []
    if (!req.body.name){
        errors.push("Name is required")
    }
    if(!req.body.password){
        errors.password("password is required")
    }
    
    res.render("error.ejs",{errors})
  const user = await new User({
        name:req.body.name,
        password:req.body.password    //vi ska göra hash på lösenord
    }).save()
    console.log(user)
    
    res.redirect("/")
})

router.get("/login", (req,res)=>{
    res.render("login.ejs")

})
router.post("/login", async (req,res)=>{
    const name =req.body.name
    const password = req.body.password
    //läsa data från databasen
   const username = await User.find({name:name})
   const userpass = await User.find({password:password})
   console.log(username[0].name, userpass[0].password)
   if(username[0].name===name && userpass[0].password===password) {
       res.send("Välkommen till min hemsidan")
   }
    //vi ska jämför
})
module.exports=router;