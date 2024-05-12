import mongoose from 'mongoose';
import Skill from './Skill.js';

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
    actualName: {
        type: String,
        default: "",
    },
    Skills:{
        type: [Skill.schema],
        default:undefined
    }, 

});

const User = mongoose.model('User', userSchema);

export default User;
