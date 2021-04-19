const mongoose = require("mongoose");
const user = new mongoose.Schema({
    name: { type: String },
    username: { type: String},
    password: { type: String },
    items: []
 `  `

})
const todoModal = mongoose.model("todo", user);

