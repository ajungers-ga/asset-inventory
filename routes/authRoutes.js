// PURPOSE = defining routes for:
// (1) setting up router and access my auth contoller functions

// (2) show the signup form
// (3) handle the form submissions for signup

// (4) show the login form
// (5) handle the form submissions for login

// (6) logging users out

// (7) exporting the router (see comments below number 7)

// this file connects these routes to controller functions from controllers/auth.js



// (1) BELOW = set up express router and bring in my auth controller functions (signup,login,logout)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// (2) BELOW = (show) GET /auth/signup - rendering the signup form
router.get('/signup', authController.showSignup);

// (3)BELOW = handle signup submission: POST /auth/signup - creating a new user and hash their password
router.post('/signup', authController.signup);

// (4) BELOW = (show) GET /auth/login - render the login form
router.get('/login', authController.showLogin);

// (5) BELOW = handle login submission: POST /auth/login - check credentials and store user in session 
router.post('/login', authController.login);

// (6) BELOW = logout route: GET /auth/logout - destroy session and log the user out
router.get('/logout', authController.logout);


// (7) BELOW = exporting the router object built above using all the route definitions like .get() & .post()
module.exports = router;

// ABOVE = see server.js for lines:
// 1. const authRoutes = require('./routes/authRoutes');
// 2. app.use('/auth', authRoutes);

// these lines from my server.js file are saying "whenever someone visits /auth/... 
// ... use the routes defined in authRoutes.js