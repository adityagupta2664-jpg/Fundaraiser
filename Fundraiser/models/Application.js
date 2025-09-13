const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  sector: {
    type: String,
    enum: ['tech', 'agri', 'health', 'energy', 'all'],
    required: true
  },
  stage: {
    type: String,
    enum: ['idea', 'early', 'growth'],
    required: true
  },
  summary: {
    type: String,
    maxlength: 500
  },
  // Full application specific fields
  registeredEntity: String,
  pitchDeckUrl: String,
  productDescription: String,
  
  applicationType: {
    type: String,
    enum: ['quick', 'full'],
    required: true
  },
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'approved', 'rejected'],
    default: 'submitted'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);