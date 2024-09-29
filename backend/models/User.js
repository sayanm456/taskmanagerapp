// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user'
    },
    date:{
        type: Date,
        default: Date.now
    },
});


const User = mongoose.model('user', UserSchema)

// eslint-disable-next-line no-undef
module.exports = User;