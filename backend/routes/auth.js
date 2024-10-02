// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authAdmin, authUser } = require('../middleware/authUser');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).notEmpty().withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'user']).default('user'),
  ],
  authController.registerUser
);

// Login route
router.post('/login', [
  body('email', 'Enter a valid email').notEmpty().isEmail().withMessage('Valid email is required'),
  body('password', 'Password cannot be blank').exists().withMessage('Password must be at least 6 characters'),
], authController.loginUser);

module.exports = router;

// Get user details
router.get('/getuser', authUser, authAdmin , authController.getUser);
