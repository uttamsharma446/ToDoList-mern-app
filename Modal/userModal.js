const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const user = new mongoose.Schema({
    name: { type: String },
    username: { type: String},
    password: { type: String },
    items: []


})

user.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});
const userModel = mongoose.model("user", user);
module.exports = {
    userModal: userModel
}
