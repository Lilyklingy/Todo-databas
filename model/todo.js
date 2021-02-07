const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:3, maxlength:20, lowercase:true}, //min, max number   det kan funga error
    data: {type: Date, default: Date.now}
})
//schema validering
//required: function () {return true if user fullfilled our requirements}
//frontend
//validera i api
//validera i schema
//user defined function

// egna metoder för att kunna få rätt/avancerade queries/frågor:  filter(){  }
const Todo = mongoose.model("todo", todoSchema)
module.exports = Todo;
