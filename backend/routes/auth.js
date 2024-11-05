// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Route 1: Register users based on theirn role: admin or user
// GET: "api/auth/register"
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

// Route 2: Get logged in user details based on theirn role: admin or user
// POST: "api/auth/login"
router.post('/login', [
  body('email', 'Enter a valid email').notEmpty().isEmail().withMessage('Valid email is required'),
  body('password', 'Password cannot be blank').exists().withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'user']).withMessage('role must be required'),
], authController.loginUser);

module.exports = router;

// Get logged in user details based on their role: user or admin
// POST: "api/auth/getuser" 
router.get('/getuser', authController.getUsers);