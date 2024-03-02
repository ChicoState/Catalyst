import mongoose from 'mongoose';

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
        type: Number,  // Corrected to "Number" from "Int"
        default: 0,
    }
});

const User = mongoose.model('User', userSchema);

export default User;
