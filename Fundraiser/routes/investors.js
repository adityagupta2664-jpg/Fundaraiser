const express = require('express');
const Investor = require('../models/Investor');
const router = express.Router();

// GET /api/investors - Get all investors with filtering and search
router.get('/', async (req, res) => {
  try {
    const { type, stage, sector, q, sort = 'createdAt', limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    // Apply filters
    if (type && type !== 'all') query.type = type;
    if (stage && stage !== 'all') query.stage = { $in: [stage] };
    if (sector && sector !== 'all') query.sectors = { $in: [sector] };
    
    let sortObj = {};
    if (sort === 'stage') {
      sortObj = { stage: 1 };
    } else {
      sortObj = { createdAt: -1 };
    }
    
    let investors;
    
    // Text search if query provided
    if (q && q.trim()) {
      investors = await Investor.find({
        ...query,
        $text: { $search: q.trim() }
      }).sort(sortObj).limit(parseInt(limit));
    } else {
      investors = await Investor.find(query).sort(sortObj).limit(parseInt(limit));
    }
    
    res.json({
      status: 'success',
      data: { investors }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/investors/:id - Get single investor
router.get('/:id', async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    
    if (!investor) {
      return res.status(404).json({
        status: 'error',
        message: 'Investor not found'
      });
    }
    
    res.json({
      status: 'success',
      data: { investor }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;