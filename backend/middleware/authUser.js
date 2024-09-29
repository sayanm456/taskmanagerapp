/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const authUser = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("User Dosen't Exist");
            
        }
        req.user = user;
        next();

    }
    catch(error){
        res.status(401).json({error, message: 'Please Authenticate'})
    }
}


module.exports = { authUser };