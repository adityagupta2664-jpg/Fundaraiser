const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    default: 'Check official portal for complete eligibility.'
  },
  link: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ['central', 'maharashtra', 'tamilnadu', 'karnataka', 'up'],
    default: 'central'
  },
  stage: {
    type: String,
    enum: ['idea', 'early', 'growth'],
    default: 'early'
  },
  sector: {
    type: String,
    enum: ['tech', 'agri', 'greentech', 'health', 'all'],
    default: 'all'
  },
  fundingAmount: {
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
schemeSchema.index({ name: 'text', desc: 'text', eligibility: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);