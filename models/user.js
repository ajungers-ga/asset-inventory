// PURPOSE = this fine defines the schema and model for USERS in the app
// it ensures that every user has a unique username and a hashed password - 
// and that these are stored securely in mongoDB

// BELOW = import mongoose to define the user schema and model
const mongoose = require('mongoose');

// BELOW = defining the structure of a user. username must be unique, password is required and must be provided
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // username must be provided and must be UNIQUE (no duplicates)
  password: { type: String, required: true } // password is also required (i hash this in the auth CONTROLLER)
});


// BELOW = create and export the User model so it can be used in auth ROUTES and session logic
module.exports = mongoose.model('User', userSchema);