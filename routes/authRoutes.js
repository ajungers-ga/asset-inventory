const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Show signup form
router.get('/signup', authController.showSignup);

// Handle signup submission
router.post('/signup', authController.signup);

// Show login form
router.get('/login', authController.showLogin);

// Handle login submission
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
