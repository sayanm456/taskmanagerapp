const authAdmin = (req, res, next)=>{
    // Authenticate admin user
    if(req.user && req.user.role !== 'admin'){
        return res.status(403).json({error: 'Access Denied, Admins only'});
        
    }
    next();
};

module.exports = { authAdmin };