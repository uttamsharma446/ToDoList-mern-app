const router=require("express").Router();
const todo=require("../Modal/todoModal");
router.post("/add-item",function(req,res){
    const item=req.body.item;
    const newItem=new todo({
        item:item
    });
    newItem.save(function(err){
        if(!err)
        {
            res.send("one Item add")
        }
        else
        {
            res.send(err);
        }
    })
});

router.get("/get-item",function(req,res){
      todo.find({},(err,result)=>{
          if(!err)
          {
              res.send(result);
          }
          else
          {
              res.send(err);
          }

      })
})

//to delete a specific item for todo list
router.delete("/item/:id",function(req,res){
    const _Id=req.params.id;
    todo.deleteOne({_id:_Id},function(err){
        if(!err)
        {
            res.send("deleted");
        }
        else
        {
            res.send(err);
        }
    })
})

module.exports=router;