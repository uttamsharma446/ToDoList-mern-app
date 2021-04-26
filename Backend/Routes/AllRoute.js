const router=require("express").Router();
const {addUser,loginUser, addItem,allUser,getItem, deleteUser, deleteItem} =require("./methods");
const {userModal}=require("../Modal/userModal");
const { verification } = require("../Login/login");
const {clearItems, editItem} =require("../Todo/todo");
router.post("/adduser",addUser);
router.post("/login",loginUser);
router.put("/addItem/:id",addItem);
//find all user
router.get("/all-user",allUser);
router.post("/verify",verification);
//get Item
router.get("/get-item/:id",getItem);
//delete all user
router.delete("/delete",deleteUser);

//delete a item from todo list
router.delete("/del-item/:id/:index",deleteItem);
// clear all items from todo list
router.delete("/todo/clear-items/:id",clearItems);

//edit one item from todo list
router.put("/todo/edit-item/:id",editItem);
module.exports=router;