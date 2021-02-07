const express = require("express")
const Todo = require("../model/todo")
const router = express.Router()  //mini app
//router mini app -- app.getbb alt.   router.get

router.get("/", async (req, res)=>{ 
  console.log(req.query)  //query string   hjälpa infor
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1; //+ => number    const sorted = Number(req.query.page)
    try{
    //const todolist = 
  //   await new Todo ({
  //       name: "dummy tasks"
  //   }).save()

  //hur många data vi har
  const totalData = await Todo.find().countDocuments();
  //hur många task skulle visas per gång / per sida
  const dataToShowPerReq = 3;
  //hur många dela/sidor vi skulle ha
  //totalPages
  const totalDataPart = Math.ceil(totalData/dataToShowPerReq);   //Math.ceil(totalData/dataToShowPerReq)
  const dataToShow = dataToShowPerReq * page;
      const data = await Todo.find().limit(dataToShow).sort({name:sorted}) //.find({name:tränna}) => det kan söka key word  //  .limit(siffror) => 頭幾個 //  .skip(siffror) => jump over
      //  .select({name: 1}) => det visar bara en infor från objekt  //  .sort({name:1})   det kan sortera   -1  mot  descending, asending  // .count()

      //Todo.filter()
      res.render("index.ejs", {data:data, errors:"empty", dataToShow, dataToShowPerReq, totalDataPart, totalData})  //rendera
      //data(key) : data(value)  => data
    }
    catch(err){
        const error = err
        res.render("error.ejs", { error:error})
    }
  })
  //mongodb -> model(find) -> express api (app.get) -> ejs -> slutanvändare
  
  //användare formulär -> ejs -> express api (app.post) -> model(new Model()save()) -> mongodb
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
  //edit och delete
  //edit del
  router.get("/edit/:id", async (req, res)=>{  //skicka in hela data listan, + id som kommer via req.params.id
      //hittar data
       
    const todo =  await Todo.findOne({_id:req.params.id})
    // vi kommer att skicka datan till en ejs file edit.ejs
    res.render("edit.ejs" , {todo:todo})
      //edit.ejs ett förmulär
  })
  router.post("/edit", async (req, res)=>{
      //req.body.name , req.body.id
      console.log(req.body)
      await Todo.updateOne({_id:req.body.id},{name:req.body.name})
      //post request
      res.redirect("/")
  })
  //delete del                        //app.delete( ) kan inte använda i HTML men det kan använda i React / httpxMLRequest / axios / fetch  -> js/ react / vue / angular
  router.get("/delete/:id", async (req, res)=>{    // app.get dör att kunna göra delete operation i ejs/jade/pug/handlebar/html
    //randerar  
     const id = req.params.id 
      await  Todo.deleteOne({_id:id})
    //redirect todo route:
    res.redirect("/")
  })
  
  //process.env.DATABASE_URL
  module.exports = router