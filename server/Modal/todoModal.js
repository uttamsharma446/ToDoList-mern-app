const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
    item:"",
   
})
const todoModel=mongoose.model("items",todoSchema);
module.exports=todoModel;
