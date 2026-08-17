const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { pool } = require('../db/connection');
const { hashPassword } = require('../utils/hashPassword');

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ errors: ['Name, email, and password are required'] });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 254) {
    return res.status(400).json({ errors: ['Email is too long'] });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ errors: ['Email format is invalid'] });
  }

  if (password.length < 8 || password.length > 128) {
    return res.status(400).json({ errors: ['Password must be between 8 and 128 characters'] });
  }

  const passwordHash = await hashPassword(password);
  const rawSessionId = crypto.randomBytes(32).toString('hex');
  const sessionHash = crypto.createHash('sha256').update(rawSessionId).digest('hex');
  const expiresAt = new Date(Date.now() + 86400000);

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [userResult] = await connection.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, normalizedEmail, passwordHash]
    );

    await connection.execute(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
      [sessionHash, userResult.insertId, expiresAt.toISOString().slice(0, 19).replace('T', ' ')]
    );

    await connection.commit();

    res.cookie('sid', rawSessionId, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/api',
      maxAge: 86400000
    });

    res.status(201).json({
      user: { id: userResult.insertId, name, email: normalizedEmail }
    });
  } catch (err) {
    await connection.rollback();
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Registration failed' });
    }
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errors: ['Email and password are required'] });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 254) {
    return res.status(400).json({ errors: ['Email is too long'] });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ errors: ['Email format is invalid'] });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1',
      [normalizedEmail]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      await connection.rollback();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const rawSessionId = crypto.randomBytes(32).toString('hex');
    const sessionHash = crypto.createHash('sha256').update(rawSessionId).digest('hex');
    const expiresAt = new Date(Date.now() + 86400000);

    await connection.execute(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
      [sessionHash, user.id, expiresAt.toISOString().slice(0, 19).replace('T', ' ')]
    );

    await connection.commit();

    res.cookie('sid', rawSessionId, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/api',
      maxAge: 86400000
    });

    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    await connection.rollback();
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
}

/* ========================================
   Phase B5: Logout — Server-Side Session Invalidation

   Reads the `sid` cookie, SHA-256 hashes it,
   and deletes the matching session row so the
   session can never be used again.

   Design notes:
   - Raw session ID and session hash are NEVER
     logged or returned in any response.
   - Idempotent: logging out without a cookie,
     or with an already-invalid cookie, still
     returns 200.
   - Parameterized SQL only.
   - DB connection is always released in finally.
   ======================================== */
async function logout(req, res) {
  const rawSessionId = req.cookies.sid;

  if (!rawSessionId) {
    return res.status(200).json({ message: 'Logged out' });
  }

  const sessionHash = crypto.createHash('sha256').update(rawSessionId).digest('hex');

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      'DELETE FROM sessions WHERE id = ?',
      [sessionHash]
    );

    res.clearCookie('sid', {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/api'
    });

    return res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { register, login, logout };