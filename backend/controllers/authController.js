const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

JWT_SECRET_KEY = "User#AuThenTication"


//Register a user
exports.registerUser = async (req, res) => {
    // if there are any error or errors, return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, User already registerd" });
        }

        // Password Encryption
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        
        // Create a User
        user = await User.create({
                name: req.body.name, 
                email: req.body.email, 
                password: secPass, 
                role: req.body.role 
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET_KEY);

        res.status(201).json({authtoken, message: 'User registered successfully'});
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
}

//Login a user
exports.loginUser = async (req, res) => {  
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email, role })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({error: "Invalid or Incorrect password!"})
        }

        const data = {
            user: {
                _id: user.id,
                name: user.name,
                role: user.role
            }
        }
        console.log(data)

        const authtoken = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '30d' });
        res.json({ data, authtoken });

    } catch (err) {
        res.status(500).send({ error: err.message, message: 'Internal Server Error' })
    }
}

exports.getUser = async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
        if(!user) {
            res.status(400).json({message: 'Access denied!'})
        }

        // Check if the user is an admin or if the request is made by the user themselves
        if (req.user.id !== user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Internal Server Error' })
    }
}