/* ========================================
   STUDENT REMINDER APP
   Phase A1: Node.js + Express Foundation

   Starts the Express server and exposes
   a /api/health endpoint for connectivity
   checks. No database / auth / CRUD yet.
   ======================================== */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// Global Middleware
// ========================================
app.use(helmet());            // Security headers
app.use(cors());              // Cross-origin API access
app.use(express.json());      // Parse JSON request bodies
app.use(morgan('dev'));       // Request logging

// ========================================
// Routes
// ========================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'student-reminder-app-api',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// 404 handler
// ========================================
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// ========================================
// Error handler
// ========================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ========================================
// Start server
// ========================================
app.listen(PORT, () => {
  console.log(`Student Reminder API running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});