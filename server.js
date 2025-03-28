// Load environment variables
require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

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

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Asset Inventory Manager!');
});

// Start server
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});