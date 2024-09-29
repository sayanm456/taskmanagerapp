const authAdmin = (req, res, next)=>{
    // Authenticate admin user
    if(!req.user.isAdmin){
        return res.status(403).json({error: 'Admin access denied'});
    }
    next();
};

// eslint-disable-next-line no-undef
module.exports = { authAdmin };