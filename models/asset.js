const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  txnHash: {
    type: String,
    required: true,
  },
},{timestamps:true});

const AssetHistorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  sku: {
    type: String,
    required: true,
  },
  history: [HistorySchema],
},{ timestamps: true });

module.exports = mongoose.model('History', AssetHistorySchema);