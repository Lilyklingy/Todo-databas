const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:3, maxlength:20, lowercase:true}, //min, max number   det kan funga error
    data: {type: Date, default: Date.now}
})
const Todo = mongoose.model("todo", todoSchema)
module.exports = Todo;
