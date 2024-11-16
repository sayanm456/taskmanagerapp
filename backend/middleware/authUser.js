const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authUser = async (req, res, next) => {
    const token = req.header('authtoken');
    if(!token) {
        return res.status(401).json({message: 'authorization denied, please authenticate using valid token!'})
    }
    try{   
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data.user;
        if(!req.user) return res.status(404).json({message: 'User not found'});
        next();
    }
    catch(error){
        res.status(401).json({error, message: 'Please Authenticate'})
    }
}

// Middleware to authenticate admin users only
const authAdmin = (req, res, next)=>{
    // Authenticate admin user
    if(req.user && req.user.role !== 'admin'){
        return res.status(403).json({error: 'Access Denied, Admins only'});
        
    }
    next();
};

module.exports = { authUser, authAdmin };