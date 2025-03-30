const bcrypt = require('bcrypt');
const User = require('../models/user');

// Show signup form
const showSignup = (req, res) => {
  res.render('auth/signup');
};

// Handle signup form submission
const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log('Creating user:', req.body.username, hashedPassword);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.redirect('/auth/login');
  } catch (err) {
    console.log(err);
    res.send('Error signing up');
  }
};

// Show login form
const showLogin = (req, res) => {
  res.render('auth/login');
};

// Handle login form submission
const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log('Logging in:', req.body.username);

    if (!user) {
      console.log('User not found');
      return res.send('User not found');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('Password valid:', validPassword);

    if (!validPassword) return res.send('Invalid credentials');

    req.session.user = user;
    res.redirect('/portal');
  } catch (err) {
    console.log(err);
    res.send('Error logging in');
  }
};

// Handle logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {
  showSignup,
  signup,
  showLogin,
  login,
  logout
};