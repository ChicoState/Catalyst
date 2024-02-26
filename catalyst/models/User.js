// this file is analgous to a .h file in c++, it defines the user class
const mongoose = require('mongoose');

//defines attributes of a user, this will be saved to the mongo databse
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    takenQuestionnaire: {
        type: Boolean,
        default: false,
    },
    actualName: {
        type: String,
        default: "",
    },
    skill: {
        type: String,
        default: "",
    },
    time: {
        type: Int, 
        default: 0,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
