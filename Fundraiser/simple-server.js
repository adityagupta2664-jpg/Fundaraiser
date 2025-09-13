const http = require('http');
const url = require('url');

const schemes = [
  { _id: '1', name: 'Startup India Seed Fund', desc: 'Grants up to ₹50 L for early-stage startups', state: 'central', stage: 'early', sector: 'all' },
  { _id: '2', name: 'BIRAC BioNEST', desc: 'Biotechnology incubation program', state: 'central', stage: 'early', sector: 'health' }
];

const investors = [
  { _id: '1', name: 'Indian Angel Network', desc: 'Angels and syndicates investing in early-stage', type: 'angel' },
  { _id: '2', name: 'Sequoia Capital India', desc: 'Leading VC firm investing in technology startups', type: 'vc' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (parsedUrl.pathname === '/api/schemes') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', data: { schemes } }));
  } else if (parsedUrl.pathname === '/api/investors') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', data: { investors } }));
  } else if (parsedUrl.pathname === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', message: 'Server running' }));
  } else if (req.method === 'POST' && parsedUrl.pathname === '/api/applications/quick') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', message: 'Application submitted' }));
  } else if (req.method === 'POST' && parsedUrl.pathname === '/api/contact') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', message: 'Message sent' }));
  } else if (req.method === 'POST' && parsedUrl.pathname === '/api/auth/signup') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', message: 'Account created' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ status: 'error', message: 'Not found' }));
  }
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});