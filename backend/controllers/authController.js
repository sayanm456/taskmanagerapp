const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


//Register a user
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Login a user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Inverse credentials' })
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({error: "Invalid or Incorrect password!"})
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ authtoken });

    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}