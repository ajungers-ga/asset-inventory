const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Used', 'Refurbished'], default: 'Used' },
  serialNumber: String,
  purchaseDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // for ownership
});

module.exports = mongoose.model('Asset', assetSchema);
