const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "User#AuThenTication"

const authUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({message: 'authorization denied, please authenticate using valid token!'})
    }
    try{   
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).json({error, message: 'Please Authenticate'})
    }
}

const authAdmin = (req, res, next)=>{
    // Authenticate admin user
    if(req.user && req.user.role !== 'admin'){
        return res.status(403).json({error: 'Access Denied, Admins only'});
        
    }
    next();
};

module.exports = { authUser, authAdmin };