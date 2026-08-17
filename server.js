/* ========================================
   STUDENT REMINDER APP
   Phase A2: Express Server + MySQL Connection

   Express server with /api/health endpoint
   that reports database connectivity status.

   Database availability is verified at
   startup WITHOUT blocking server startup.
   If MySQL is unavailable, the server keeps
   running and reports database: "disconnected".
   ======================================== */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { testConnection } = require('./db/connection');
const originProtection = require('./middleware/originProtection');
const authRoutes = require('./routes/auth');
const remindersRoutes = require('./routes/reminders');

const app = express();
const PORT = process.env.PORT || 3000;

// Tracked database connectivity state.
// Updated asynchronously at startup.
let databaseStatus = 'disconnected';

// ========================================
// Global Middleware
// ========================================
app.use(helmet());            // Security headers
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000' }));              
app.use(express.json());      // Parse JSON request bodies
app.use(morgan('dev'));       // Request logging
app.use(cookieParser());      // Parse cookies
app.use(originProtection);    // Origin/CSRF protection for API routes

// ========================================
// Routes
// ========================================
app.use('/api/auth', authRoutes);          // Authentication routes
app.use('/api/reminders', remindersRoutes); // Reminders CRUD routes

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'student-reminder-app-api',
    database: databaseStatus,
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

  // Verify database connectivity (non-blocking, failure-safe).
  testConnection()
    .then((result) => {
      databaseStatus = result.connected ? 'connected' : 'disconnected';
      console.log(
        result.connected
          ? '[database] Connected'
          : '[database] Unavailable — server continues with database: "disconnected"'
      );
    })
    .catch(() => {
      databaseStatus = 'disconnected';
      console.error('[database] Unexpected error during startup check');
    });
});