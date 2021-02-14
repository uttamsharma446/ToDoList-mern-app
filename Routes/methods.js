const { userModal } = require("../Modal/userModal")

module.exports = {
    addUser: (req, res) => {
        const { username, password, name } = req.body;
        const newUser = new userModal({
            username: username,
            password: password,
            name: name
        })
        newUser.save((err, result) => {
            if (!err) {
                res.send(result);
            }
            else {
                res.send(err);
            }

        })

    },
    loginUser: (req, res) => {
        const {username,password}=req.body;
        userModal.findOne({username:username,password:password}, (err, result) => {
            if(!err)
            {
                res.send(result)
            }
            else
            {
                res.send(err)
            }
        })
    },
    allUser:(req,res)=>{
        userModal.find({},(err,result)=>{
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
    }
}