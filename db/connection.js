/* ========================================
   STUDENT REMINDER APP
   Phase A2: MySQL Connection

   Provides a shared MySQL connection pool
   using the official mysql2 driver.

   Credentials are loaded exclusively from
   environment variables (dotenv / .env).
   They are NEVER hardcoded here.
   ======================================== */

const mysql = require('mysql2/promise');

// ========================================
// Configuration (from environment variables)
// ========================================
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  waitForConnections: true,
  queueLimit: 0,
  charset: 'utf8mb4'
};

// ========================================
// Connection Pool
// ========================================
const pool = mysql.createPool(dbConfig);

/**
 * Verifies the database connection by
 * executing a trivial query.
 *
 * @returns {Promise<{ connected: boolean }>}
 */
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1');
    return { connected: true };
  } catch (err) {
    console.error('[database] Connection failed:', safeErrorMessage(err));
    return { connected: false };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Builds a safe, non-sensitive error message.
 * Credentials and connection details are never
 * included in the output.
 *
 * @param {Error} err
 * @returns {string}
 */
function safeErrorMessage(err) {
  const code = typeof err.code === 'string' ? err.code : 'UNKNOWN';
  const message = typeof err.message === 'string' ? err.message : 'Unknown database error';
  // mysql2 errors may embed the password in the message (e.g. ER_ACCESS_DENIED).
  // Redact anything that looks like a credential reference.
  const redacted = message
    .replace(/using password: YES/g, 'using password: [REDACTED]')
    .replace(/for user '([^']+)'@/g, "for user '[USER REDACTED]'@");
  return `[${code}] ${redacted}`;
}

module.exports = {
  pool,
  testConnection,
  dbConfig
};