const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  history: [HistorySchema],
},{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);