/* ========================================
   STUDENT REMINDER APP
   Phase B4: Authentication Middleware

   Reads the `sid` cookie, SHA-256 hashes it,
   and looks up the session in the sessions table
   (joined with users). Enforces expiry at the
   SQL level via `expires_at > NOW()`.

   On success: req.user = { id, name, email }
   On failure: 401 { error: 'Unauthorized' }

   Design notes:
   - Raw session ID is NEVER stored in the DB,
     NEVER selected, and NEVER logged.
   - password_hash is NEVER selected.
   - All failure paths return an identical 401
     to prevent information leakage.
   ======================================== */

const crypto = require('crypto');
const { pool } = require('../db/connection');

async function authenticate(req, res, next) {
  const rawSessionId = req.cookies.sid;

  if (!rawSessionId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sessionHash = crypto.createHash('sha256').update(rawSessionId).digest('hex');

  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(
      'SELECT s.user_id, u.name, u.email ' +
      'FROM sessions s ' +
      'JOIN users u ON s.user_id = u.id ' +
      'WHERE s.id = ? ' +
      '  AND s.expires_at > NOW() ' +
      'LIMIT 1',
      [sessionHash]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const session = rows[0];

    req.user = {
      id: session.user_id,
      name: session.name,
      email: session.email
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { authenticate };
