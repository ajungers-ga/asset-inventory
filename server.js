// notes - im only adding major route groups like auth, assets, users. 
// notes - also serving the homepage and global stuff i might add like contact 
// notes - my middleware and listening port will also be found here

// Load environment variables
require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Import routes and middleware
const assetRoutes = require('./routes/assetRoutes');
const authRoutes = require('./routes/authRoutes');       // 
const realAuth = require('./middleware/realAuth');       // middleware for protecting routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB error:', err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
  })
);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// home page
app.get('/', (req, res) => {
  res.render('home');
});

// BELOW = using /auth prefix for signup, signin, signout routes
app.use('/auth', authRoutes);

// BELOW = any route starting with /portal should follow logic in assetsRoutes.js
// Only accessible if realAuth passes
app.use('/portal', realAuth, assetRoutes); 

// Start server
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
