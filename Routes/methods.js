const { userModal } = require("../Modal/userModal")

module.exports = {
    addUser: (req, res) => {
        const { username, password, name } = req.body;
        const newUser = new userModal({
            username: username,
            password: password,
            name: name
        })
        userModal.findOne({username:username})
        .then(result=>{
            if(result)
            {
                const exist="exist";
                res.send(exist);
            }
            if(!result)
            {
                newUser.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while adding user"
                    });
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred while login a user"
            });
        })
       
       
        

    },
    loginUser: (req, res) => {
        const {username,password}=req.body;
        userModal.findOne({username:username,password:password})
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred while login a user"
            });
        })
    },
    allUser:(req,res)=>{
        userModal.find()
        .then(result=>{
            res.send(result);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred while adding user"
            });
        })
    },
    getItem:(req,res)=>{
        const id=req.params.id;
        userModal.findOne({_id:id},(err,result)=>{
            if(!err)
            {
                res.send(result.items);
            }
            else
            {
                res.send(err);
            }
        })
    },
    addItem: (req, res) => {
        const id=req.params.id;
        const item=req.body.item;
    
        userModal.updateOne({ _id:id},
            { $push: { items: req.body.item } }, (err, result) => {
                if (!err) {
                    res.send(result);
                }
                else {
                    res.send(err);
                }
            })
    },
    deleteUser:(req,res)=>{
        userModal.deleteMany({},(err,result)=>{
            if(!err)
            {
                res.send(result);
            }
            else
            {
                res.send(err);
            }
        })
    },
    deleteItem:(req,res)=>{
        const {id,index}=req.params;
        userModal.findById(id)
        .then(result=>{
            if(result)
            {
                var arr=result.items;
                 arr.splice(index,1);
                result.items=arr;
                result.save()
                .then(r=>{
                    res.send("deleted")
                })
                .catch(errr=>{
                    res.send(errr)
                })

            }

        })
        .catch(err=>{
            res.send(err);
        })
    }
}