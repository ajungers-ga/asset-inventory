// Purpose = this file defines the schema structure and model for the assets im tracking.
// Every time user creates, finds, or updates an asset in mongoDB, they're working with this model


// BELOW = import mongoose so we i can define the asset schema and model
const mongoose = require('mongoose');

// BELOW = defining the fields below for each asset stored in mongoDB
const assetSchema = new mongoose.Schema({
  name: String,            // Device Label
  category: String,        // Model
  make: String,            // Make Label (now added)
  condition: String,       // Condition (New, Used, Refurbished)
  assetTag: String,        // Asset Tag (unique ID or identifier)
  manufacturedDate: Date,  // Manufactured Year stored as full Date
 
  userId: {                // Reference to the user who owns the asset
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// BELOW = creating and exporting the model from the schema so I can use it in CONTROLLERS
const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;
