/* ========================================
   STUDENT REMINDER APP
   Phase D: Reminders CRUD

   Handles create / list / get / update / delete
   of reminders for the AUTHENTICATED user.

   Security / data rules:
   - Every query is scoped to req.user.id.
   - user_id is NEVER accepted from the request
     body; it always comes from authenticate.
   - Parameterized SQL only.
   - DB connections are released in finally.
   - Safe error messages only.
   ======================================== */

const { pool } = require('../db/connection');

const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
const STATUSES = ['pending', 'completed', 'cancelled'];

const REMINDER_FIELDS =
  'id, title, description, due_date, priority, status, created_at, updated_at';

/**
 * Normalizes a value to a MySQL DATETIME ('YYYY-MM-DD HH:MM:SS')
 * or returns null if it is not a valid date-time string.
 * Accepts 'YYYY-MM-DD', 'YYYY-MM-DD HH:MM', 'YYYY-MM-DDTHH:MM:SS', etc.
 * @param {*} value
 * @returns {string|null}
 */
function toDatetime(value) {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  if (!v) return null;

  // Normalize the ISO 'T' separator so it matches the MySQL format.
  const d = v.includes('T') ? v.replace('T', ' ') : v;

  // MySQL DATETIME: YYYY-MM-DD [HH:MM[:SS]]
  if (!/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/.test(d)) {
    return null;
  }

  let full = d;
  if (full.length === 10) full += ' 00:00:00';
  else if (full.length === 16) full += ':00';

  // Reject impossible dates (e.g. 2026-13-40).
  if (Number.isNaN(Date.parse(full.replace(' ', 'T')))) {
    return null;
  }

  return full;
}

// ========================================
// POST /api/reminders — create
// ========================================
async function create(req, res) {
  const { title, description, due_date, priority } = req.body || {};

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ errors: ['Title is required'] });
  }
  const trimmedTitle = title.trim();
  if (trimmedTitle.length > 200) {
    return res.status(400).json({ errors: ['Title must be 200 characters or fewer'] });
  }

  const due = toDatetime(due_date);
  if (!due) {
    return res.status(400).json({ errors: ['Valid due_date is required'] });
  }

  if (priority !== undefined && priority !== null && !PRIORITIES.includes(priority)) {
    return res.status(400).json({ errors: ['priority must be low, medium, high, or urgent'] });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO reminders (user_id, title, description, due_date, priority) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, trimmedTitle, description ?? null, due, priority || 'medium']
    );

    const [rows] = await connection.execute(
      `SELECT ${REMINDER_FIELDS} FROM reminders WHERE id = ? AND user_id = ?`,
      [result.insertId, req.user.id]
    );

    return res.status(201).json({ reminder: rows[0] });
  } catch (err) {
    console.error('Create reminder error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
}

// ========================================
// GET /api/reminders — list (user-scoped)
// ========================================
async function list(req, res) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT ${REMINDER_FIELDS} FROM reminders WHERE user_id = ? ORDER BY due_date ASC, id DESC`,
      [req.user.id]
    );
    return res.status(200).json({ reminders: rows });
  } catch (err) {
    console.error('List reminders error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
}

// ========================================
// GET /api/reminders/:id — get one (user-scoped)
// ========================================
async function getOne(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({ error: 'Not Found' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT ${REMINDER_FIELDS} FROM reminders WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not Found' });
    }

    return res.status(200).json({ reminder: rows[0] });
  } catch (err) {
    console.error('Get reminder error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
}

// ========================================
// PUT /api/reminders/:id — update (user-scoped)
// ========================================
async function update(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({ error: 'Not Found' });
  }

  const { title, description, due_date, priority, status } = req.body || {};

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ errors: ['Title cannot be empty'] });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ errors: ['Title must be 200 characters or fewer'] });
    }
  }

  if (due_date !== undefined && !toDatetime(due_date)) {
    return res.status(400).json({ errors: ['Invalid due_date'] });
  }

  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return res.status(400).json({ errors: ['priority must be low, medium, high, or urgent'] });
  }

  if (status !== undefined && !STATUSES.includes(status)) {
    return res.status(400).json({ errors: ['status must be pending, completed, or cancelled'] });
  }

  const sets = [];
  const params = [];

  if (title !== undefined) {
    sets.push('title = ?');
    params.push(title.trim());
  }
  if (description !== undefined) {
    sets.push('description = ?');
    params.push(description === null ? null : String(description));
  }
  if (due_date !== undefined) {
    sets.push('due_date = ?');
    params.push(toDatetime(due_date));
  }
  if (priority !== undefined) {
    sets.push('priority = ?');
    params.push(priority);
  }
  if (status !== undefined) {
    sets.push('status = ?');
    params.push(status);
  }

  if (sets.length === 0) {
    return res.status(400).json({ errors: ['No valid fields to update'] });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      `UPDATE reminders SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`,
      [...params, id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not Found' });
    }

    const [rows] = await connection.execute(
      `SELECT ${REMINDER_FIELDS} FROM reminders WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    return res.status(200).json({ reminder: rows[0] });
  } catch (err) {
    console.error('Update reminder error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
}

// ========================================
// DELETE /api/reminders/:id — delete (user-scoped)
// ========================================
async function remove(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({ error: 'Not Found' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      'DELETE FROM reminders WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not Found' });
    }

    return res.status(200).json({ message: 'Reminder deleted' });
  } catch (err) {
    console.error('Delete reminder error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { create, list, getOne, update, remove };