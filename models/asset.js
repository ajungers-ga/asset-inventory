const mongoose = require('mongoose');

// BELOW = defining the schema for each asset document in MongoDB
const assetSchema = new mongoose.Schema({
  name: String,            // Device Label
  category: String,        // Model
  make: String,            // Make Label (now added)
  condition: String,       // Condition (New, Used, Refurbished)
  assetTag: String,        // Asset Tag (unique ID or identifier)
  manufacturedDate: Date,  // Manufactured Year stored as full Date (now added)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// BELOW = creating and exporting the model from the schema
const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;
