-- ============================================================
-- STUDENT REMINDER APP
-- Phase B1: Sessions Table
--
-- Migration: 002_sessions_table.sql (version-controlled)
--
-- Creates:
--   1. Table     : sessions
--
-- Executable on a fresh database. Idempotent (IF NOT EXISTS)
-- so it is safe to re-run after 001_initial_schema.sql.
--
-- DEPENDENCY:
--   Must run AFTER db/migrations/001_initial_schema.sql
--   because the foreign key references users(id).
--
-- DESIGN (matches Phase B1-B4 authentication code):
--   - Raw session IDs are NEVER stored.
--   - authController.js stores a SHA-256 hex hash of the raw
--     session ID as sessions.id (64 hex characters).
--   - authenticate.js looks up sessions by id and enforces
--     expiration at the SQL level via expires_at > NOW().
-- ============================================================

-- ------------------------------------------------------------
-- 1. sessions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
  id         VARCHAR(64) NOT NULL,
  user_id    INT UNSIGNED NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP    NOT NULL,

  PRIMARY KEY (id),

  INDEX idx_user_id (user_id),
  INDEX idx_expires (expires_at),

  CONSTRAINT fk_sessions_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;