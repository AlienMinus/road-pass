require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/transit-pass';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.log('MongoDB Connection Error:', error);
  });

// Routes
const transitPassRoutes = require('./routes/transitPass');
app.use('/api/transit-pass', transitPassRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date()
  });
});

// Config endpoint - expose environment config to frontend
app.get('/api/config', (req, res) => {
  res.json({
    API_URL: process.env.API_URL || 'http://localhost:3000/api/transit-pass',
    ADMIN_ID: process.env.ADMIN_ID || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '12345' : 'not-set'
  });
});

// Home Route
app.get('/', (req, res) => {
  res.json({
    message: 'Transit Pass API Server',
    version: '1.0.0',
    endpoints: {
      create: 'POST /api/transit-pass/create',
      getAll: 'GET /api/transit-pass/all',
      getById: 'GET /api/transit-pass/:id',
      update: 'PUT /api/transit-pass/:id',
      delete: 'DELETE /api/transit-pass/:id',
      health: 'GET /api/health',
      config: 'GET /api/config'
    }
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
