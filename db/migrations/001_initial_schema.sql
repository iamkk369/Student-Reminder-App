-- ============================================================
-- STUDENT REMINDER APP
-- Phase A3: Database Foundation — Initial Schema
--
-- Migration: 001_initial_schema.sql (version-controlled)
--
-- Creates:
--   1. Database  : student_reminder
--   2. Table     : users
--   3. Table     : reminders
--
-- Executable on a fresh database. Idempotent (IF NOT EXISTS)
-- so it is safe to re-run.
--
-- ENVIRONMENT REQUIREMENT (IMPORTANT):
--   MySQL 5.7+ (recommend 8.0) with STRICT SQL mode enabled.
--   Default installs of MySQL 5.7+/8.0 include
--   STRICT_TRANS_TABLES in sql_mode.
--
--   Verify with:  SELECT @@sql_mode;
--   Must contain: STRICT_TRANS_TABLES
--
--   Why: The reminders.priority and reminders.status columns are
--   ENUMs. Under strict mode, invalid enum values are REJECTED
--   with error ER_TRUNCATED_WRONG_VALUE_FOR_FIELD (1265).
--   Under non-strict mode they would silently become empty
--   strings — this is NOT acceptable.
--
--   If sql_mode lacks STRICT_TRANS_TABLES, enable it:
--     SET GLOBAL sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
--   (or set sql_mode in the server config file)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Create the database
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS student_reminder
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE student_reminder;

-- ------------------------------------------------------------
-- 2. users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. reminders
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reminders (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT         NULL,
  due_date    DATETIME     NOT NULL,
  priority    ENUM('low','medium','high','urgent')
              NOT NULL DEFAULT 'medium',
  status      ENUM('pending','completed','cancelled')
              NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_reminders_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE,

  KEY idx_reminders_user_due (user_id, due_date),
  KEY idx_reminders_status (status)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;