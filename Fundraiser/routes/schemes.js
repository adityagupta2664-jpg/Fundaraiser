const express = require('express');
const Scheme = require('../models/Scheme');
const router = express.Router();

// GET /api/schemes - Get all schemes with filtering and search
router.get('/', async (req, res) => {
  try {
    const { state, stage, sector, q, limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    // Apply filters
    if (state && state !== 'all') query.state = state;
    if (stage && stage !== 'all') query.stage = stage;
    if (sector && sector !== 'all') query.sector = sector;
    
    let schemes;
    
    // Text search if query provided
    if (q && q.trim()) {
      schemes = await Scheme.find({
        ...query,
        $text: { $search: q.trim() }
      }).limit(parseInt(limit));
    } else {
      schemes = await Scheme.find(query).limit(parseInt(limit));
    }
    
    res.json({
      status: 'success',
      data: { schemes }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/schemes/:id - Get single scheme
router.get('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({
        status: 'error',
        message: 'Scheme not found'
      });
    }
    
    res.json({
      status: 'success',
      data: { scheme }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;