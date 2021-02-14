const mongoose = require("mongoose");
const user = new mongoose.Schema({
    name: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    items: []


})
const userModel = mongoose.model("user", user);
module.exports = {
    userModal: userModel
}
