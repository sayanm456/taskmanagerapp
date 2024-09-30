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

//Pasword Encryption
UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('user', UserSchema)

module.exports = User;