const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');
const Investor = require('./models/Investor');
require('dotenv').config();

// Sample schemes data
const sampleSchemes = [
  {
    name: 'Startup India Seed Fund',
    desc: 'Grants up to ₹50 L for early-stage startups (prototype, proof-of-concept)',
    eligibility: 'Incorporated entity, innovative product, Indian startup',
    link: 'https://www.startupindia.gov.in/content/sih/en/sisfs.html',
    state: 'central',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹50 Lakhs'
  },
  {
    name: 'BIRAC BioNEST',
    desc: 'Biotechnology incubation program for life sciences startups',
    eligibility: 'Biotech/life sciences focus, early-stage startup',
    link: 'https://birac.nic.in/webcontent/1467_1_BioNEST.aspx',
    state: 'central',
    stage: 'early',
    sector: 'health',
    fundingAmount: 'Up to ₹50 Lakhs'
  },
  {
    name: 'Maharashtra State Innovation Society',
    desc: 'State government funding for innovative startups in Maharashtra',
    eligibility: 'Registered in Maharashtra, innovative technology',
    link: 'https://msinnovation.maharashtra.gov.in/',
    state: 'maharashtra',
    stage: 'early',
    sector: 'tech',
    fundingAmount: 'Up to ₹25 Lakhs'
  },
  {
    name: 'Karnataka Startup Cell',
    desc: 'Comprehensive startup support including funding and mentorship',
    eligibility: 'Karnataka-based startup, scalable business model',
    link: 'https://ksteps.in/',
    state: 'karnataka',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Up to ₹1 Crore'
  },
  {
    name: 'NIDHI PRAYAS',
    desc: 'Pre-incubation support for technology-based startups',
    eligibility: 'Technology-based idea, student/faculty entrepreneurs',
    link: 'https://www.nstedb.com/institutional/prayas.htm',
    state: 'central',
    stage: 'idea',
    sector: 'tech',
    fundingAmount: 'Up to ₹10 Lakhs'
  },
  {
    name: 'Atal Innovation Mission',
    desc: 'Innovation promotion platform with funding support',
    eligibility: 'Innovative solution, scalable business model',
    link: 'https://aim.gov.in/',
    state: 'central',
    stage: 'early',
    sector: 'all',
    fundingAmount: 'Varies'
  }
];

// Sample investors data
const sampleInvestors = [
  {
    name: 'Indian Angel Network',
    desc: 'Angels and syndicates investing in early-stage across sectors',
    type: 'angel',
    stage: ['early', 'growth'],
    sectors: ['tech', 'health', 'fintech'],
    location: 'Pan India',
    website: 'https://www.indianangelnetwork.com',
    ticketSize: '₹25L - ₹2Cr'
  },
  {
    name: 'Sequoia Capital India',
    desc: 'Leading VC firm investing in technology startups',
    type: 'vc',
    stage: ['early', 'growth', 'series-a'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Bangalore, Mumbai',
    website: 'https://www.sequoiacap.com/india',
    ticketSize: '₹5Cr - ₹100Cr'
  },
  {
    name: 'Accel Partners',
    desc: 'Global VC firm with strong presence in Indian startup ecosystem',
    type: 'vc',
    stage: ['early', 'growth'],
    sectors: ['tech', 'fintech'],
    location: 'Bangalore',
    website: 'https://www.accel.com',
    ticketSize: '₹2Cr - ₹50Cr'
  },
  {
    name: 'T-Hub',
    desc: 'Innovation hub and incubator supporting tech startups',
    type: 'incubator',
    stage: ['idea', 'early'],
    sectors: ['tech', 'agri', 'health'],
    location: 'Hyderabad',
    website: 'https://t-hub.co',
    ticketSize: '₹10L - ₹1Cr'
  },
  {
    name: 'Blume Ventures',
    desc: 'Early-stage VC fund investing in Indian startups',
    type: 'vc',
    stage: ['early'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Mumbai, Bangalore',
    website: 'https://blume.vc',
    ticketSize: '₹50L - ₹10Cr'
  },
  {
    name: 'Kalaari Capital',
    desc: 'Early-stage venture capital firm',
    type: 'vc',
    stage: ['early', 'growth'],
    sectors: ['tech', 'fintech', 'health'],
    location: 'Bangalore',
    website: 'https://kalaari.com',
    ticketSize: '₹1Cr - ₹25Cr'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Scheme.deleteMany({});
    await Investor.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample schemes
    await Scheme.insertMany(sampleSchemes);
    console.log('Inserted sample schemes');

    // Insert sample investors
    await Investor.insertMany(sampleInvestors);
    console.log('Inserted sample investors');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();