const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "I am a new User!!!!"
    }
},
    { timestamps: true }
);


const User = mongoose.model('User', userSchema, 'users');
module.exports = User;