const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['vc', 'angel', 'accelerator', 'incubator'],
    default: 'vc'
  },
  stage: {
    type: [String],
    enum: ['idea', 'early', 'growth', 'series-a', 'series-b'],
    default: ['early']
  },
  sectors: {
    type: [String],
    enum: ['tech', 'agri', 'health', 'energy', 'fintech', 'all'],
    default: ['all']
  },
  location: {
    type: String,
    default: 'India'
  },
  website: {
    type: String
  },
  email: {
    type: String
  },
  ticketSize: {
    type: String,
    default: 'Varies'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Text search index
investorSchema.index({ name: 'text', desc: 'text' });

module.exports = mongoose.model('Investor', investorSchema);