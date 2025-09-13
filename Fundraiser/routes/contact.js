const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }
    
    // Create contact entry
    const contact = new Contact({
      name,
      email,
      message
    });
    
    await contact.save();
    
    res.json({
      status: 'success',
      message: 'Your message has been sent successfully',
      data: { contact }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/contact - Get all contact messages (admin only)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    let query = {};
    if (status && status !== 'all') query.status = status;
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json({
      status: 'success',
      data: { contacts }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;