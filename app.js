const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Log requests
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simple input/output endpoint
app.get('/api/echo', (req, res) => {
  const name = req.query.name || 'traveler';
  res.json({ message: `Hello, ${name}! Express is working.` });
});

app.listen(PORT, () => {
  console.log(`Travlr server running at http://localhost:${PORT}`);
});
