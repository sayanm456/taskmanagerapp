const jwt = require('jsonwebtoken');
const User = require('../models/User')

JWT_SECRET_KEY = "User#AuThenTication"

const authUser = async (req, res, next) => {
    try{
        // const token = req.header('auth-token');
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) {
            return res.status(401).json({message: 'authorization denied'})
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password');
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