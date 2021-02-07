const express = require("express")
const Todo = require("../model/todo")
const router = express.Router() 
router.get("/", async (req, res)=>{ 
  console.log(req.query) 
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1; 
    try{
  const totalData = await Todo.find().countDocuments();
  const dataToShowPerReq = 3;
  const totalDataPart = Math.ceil(totalData/dataToShowPerReq);
  const dataToShow = dataToShowPerReq * page;
      const data = await Todo.find().limit(dataToShow).sort({name:sorted})
      res.render("index.ejs", {data:data, errors:"empty", dataToShow, dataToShowPerReq, totalDataPart, totalData})
    }
    catch(err){
        const error = err
        res.render("error.ejs", { error:error})
    }
  })
  router.post("/", async (req, res)=>{
      console.log(req.body.name)
      try{
      await new Todo({
          name: req.body.name
      }).save()
      res.redirect("/")
    }
    catch(err){
        res.render("error.ejs",{error:err})
    }
  })
  router.get("/edit/:id", async (req, res)=>{
    const todo =  await Todo.findOne({_id:req.params.id})
    res.render("edit.ejs" , {todo:todo})
  })
  router.post("/edit", async (req, res)=>{
      console.log(req.body)
      await Todo.updateOne({_id:req.body.id},{name:req.body.name})
      res.redirect("/")
  })
  router.get("/delete/:id", async (req, res)=>{
     const id = req.params.id 
      await  Todo.deleteOne({_id:id})
    res.redirect("/")
  })
  module.exports = router