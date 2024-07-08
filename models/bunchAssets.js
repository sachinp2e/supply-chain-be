const mongoose = require('mongoose');

const BunchAssetSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Asset', BunchAssetSchema);
