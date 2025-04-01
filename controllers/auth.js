// FILE PURPOSE = management of all authentication-related logic.

// rendering the sign up and login forms
// creating users in the mongoDb with HASHED passwords
// logging users in and saving them in the req.session
// destroying the session on logout



// BELOW = using bcrypt for password HASHING and the user model to interact with mongoDB
const bcrypt = require('bcrypt');
const User = require('../models/user');

// BELOW = (show), render the signup form for NEW users 
const showSignup = (req, res) => {
  res.render('auth/signup'); // (views/auth/signup.ejs)
};

// BELOW = handle the sign up form: hash the user's password, create new user in the database, return to login
const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log('Creating user:', req.body.username, hashedPassword);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.redirect('/auth/login'); // if signup was not successful, return the user to /auth/login and...
  } catch (err) {
    console.log(err);
    res.send('Error signing up'); // ...display error message
  }
};

//  BELOW = (show), redner the login form for returning users
const showLogin = (req, res) => {
  res.render('auth/login');
};

// BELOW = handle login form submission:
// check if user exists, validate passwrod using bcrypt, store user in session, return user to /portal
const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log('Logging in:', req.body.username);

    if (!user) {                          // if username is not found in exisiting database...
      console.log('User not found');
      return res.send('User not found');  // display error message
    }

// line 53: // defining variable (validPassword) await the results of .compare - the expected password for that username, with the password the user just entered
    const validPassword = await bcrypt.compare(req.body.password, user.password); 
    console.log('Password valid:', validPassword); // if password matches, console log this message, validPassword

    if (!validPassword) return res.send('Invalid credentials'); // if password does NOT pass the .compare for validPassword variable...

    req.session.user = user;
    res.redirect('/portal');  // ... return the user to /portal ... 
  } catch (err) {
    console.log(err);
    res.send('Error logging in'); // ... display the error message
  }
};

// BELOW = the handling of logout. destory the user session and return to the homepage '/'
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};


// BELOW = export all authentication functions so they can be used in authRoutes.js
module.exports = {
  showSignup,
  signup,
  showLogin,
  login,
  logout
};