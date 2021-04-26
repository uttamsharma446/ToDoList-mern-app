const {userModal} =require("../Modal/userModal");
module.exports={
    clearItems:(req,res)=>{
      const {id} =req.params;
      if(id!==null){
         userModal.findById(id)
         .then(result=>{
             if(result)
             {
                 result.items=[];
                 result.save((err,data)=>{
                    if(!err)
                    {
                        res.sendStatus(200)//when user's id found and clear the items array
                    }
                });
             }
             else{
                 res.sendStatus(404)//when user id is not found
             }

         })
         .catch(err=>{
            res.send(err)
         })
 
    }
    else{
        res.sendStatus(204);//id is not provided
    }
},
//edit one item from todolist
editItem:(req,res)=>{
    const {id}=req.params;
    const {index,item}=req.body;
    userModal.findById(id)
    .then(result=>{
        if(result)
        {
          var newArr= result.items
          newArr[index]=item;
         
           result.items=item;
          userModal.updateOne({_id:id},{$set:{items:newArr}},(err,data)=>{
              if(!err)
              {
                  res.sendStatus(200);
              }
          })
          
        }
    })
    .catch(err=>{
        res.send(err)
    })
}

}