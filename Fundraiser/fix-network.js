const express = require('express');
const cors = require('cors');

const app = express();

// Very permissive CORS for testing
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*'
}));

app.use(express.json());

// Test routes
app.get('/test', (req, res) => {
  res.json({ message: 'Backend connection successful!', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Server is working' });
});

// Mock data for testing
app.get('/api/schemes', (req, res) => {
  res.json({
    status: 'success',
    data: {
      schemes: [
        {
          _id: '1',
          name: 'Test Scheme',
          desc: 'This is a test scheme',
          state: 'central',
          stage: 'early',
          sector: 'tech'
        }
      ]
    }
  });
});

app.get('/api/investors', (req, res) => {
  res.json({
    status: 'success',
    data: {
      investors: [
        {
          _id: '1',
          name: 'Test Investor',
          desc: 'This is a test investor',
          type: 'vc'
        }
      ]
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`✅ Test: http://localhost:${PORT}/test`);
  console.log(`✅ Health: http://localhost:${PORT}/api/health`);
});