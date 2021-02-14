const router=require("express").Router();
const {addUser,loginUser, addItem,allUser,getItem, deleteUser} =require("./methods");
const {userModal}=require("../Modal/userModal");

router.post("/adduser",addUser);
router.post("/login",loginUser);
router.put("/addItem/:id",addItem);
//find all user
router.get("/all-user",allUser);
//get Item
router.get("/get-item/:id",getItem);
//delete all user
router.delete("/delete",deleteUser);
module.exports=router;