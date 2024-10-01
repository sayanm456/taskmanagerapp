// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'user']).notEmpty().withMessage('Role is required'),
  ],
  authController.registerUser
);

// Login route
router.post('/login', authController.loginUser);

module.exports = router;
