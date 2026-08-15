const crypto = require('crypto');
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

  if (password.length < 8) {
    return res.status(400).json({ errors: ['Password must be at least 8 characters'] });
  }

  if (password.length > 128) {
    return res.status(400).json({ errors: ['Password must be at most 128 characters'] });
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

module.exports = { register };