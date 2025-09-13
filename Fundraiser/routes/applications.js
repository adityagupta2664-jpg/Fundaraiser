const express = require('express');
const Application = require('../models/Application');
const Scheme = require('../models/Scheme');
const Investor = require('../models/Investor');
const router = express.Router();

// POST /api/applications/quick - Submit quick application
router.post('/quick', async (req, res) => {
  try {
    const { startupName, email, sector, stage, summary } = req.body;
    
    // Validate required fields
    if (!startupName || !email || !sector || !stage) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }
    
    // Create application
    const application = new Application({
      startupName,
      email,
      sector,
      stage,
      summary,
      applicationType: 'quick'
    });
    
    await application.save();
    
    // Find matching schemes and investors
    const matchingSchemes = await Scheme.find({
      $or: [
        { sector: sector },
        { sector: 'all' }
      ],
      stage: stage,
      isActive: true
    }).limit(5);
    
    const matchingInvestors = await Investor.find({
      $or: [
        { sectors: { $in: [sector] } },
        { sectors: { $in: ['all'] } }
      ],
      stage: { $in: [stage] },
      isActive: true
    }).limit(5);
    
    res.json({
      status: 'success',
      message: 'Quick application submitted successfully',
      data: {
        application,
        matches: {
          schemes: matchingSchemes,
          investors: matchingInvestors
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// POST /api/applications/full - Submit full application
router.post('/full', async (req, res) => {
  try {
    const {
      startupName,
      email,
      sector,
      stage,
      summary,
      registeredEntity,
      pitchDeckUrl,
      productDescription
    } = req.body;
    
    // Validate required fields
    if (!startupName || !email || !sector || !stage) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }
    
    // Create application
    const application = new Application({
      startupName,
      email,
      sector,
      stage,
      summary,
      registeredEntity,
      pitchDeckUrl,
      productDescription,
      applicationType: 'full'
    });
    
    await application.save();
    
    res.json({
      status: 'success',
      message: 'Full application submitted successfully',
      data: { application }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/applications - Get all applications (admin only)
router.get('/', async (req, res) => {
  try {
    const { type, status, limit = 50 } = req.query;
    
    let query = {};
    if (type && type !== 'all') query.applicationType = type;
    if (status && status !== 'all') query.status = status;
    
    const applications = await Application.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json({
      status: 'success',
      data: { applications }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;