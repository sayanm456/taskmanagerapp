const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


//Register a user
exports.registerUser = async (req, res) => {
    // if there are any error or errors, return bad requests and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Password Encryption
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email, password: secPass });
        if (user?.email?.password) {
            return res.status(400).json({ success, error: "Sorry, User already registerd" });
        }

        // Create a User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            role: req.body.role
        });
        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);

        success = true;
        res.status(201).json({ data, success, authtoken, message: 'User registered successfully' });

    } catch (err) {
        res.status(500).send({ error: err, message: err.message })
    }
}

//Login a user
exports.loginUser = async (req, res) => {
    // if there are any error or errors, return bad requests and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email, role })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Invalid or Incorrect password!" })
        }

        const data = {
            user: {
                _id: user.id,
                name: user.name,
                role: user.role
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
        success = true;
        res.status(201).json({ data, success, authtoken, message: "User loggedin successfully" });

    } catch (err) {
        res.status(500).send({ error: err, message: err.message })
    }
}

// Get loggedin users details
exports.getUsers = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user is an admin or if the request is made by the user themselves
        if (!req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, Admin only' });
        }

        const users = await User.find({ role: 'user' }).select('_id name');

        const totalUser = await User.countDocuments({ role: 'user' });
        success = true;

        res.status(201).json({success, message: "Fetched all users successfully", totalUser, users })

    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Internal Server Error' })
    }
}