// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
