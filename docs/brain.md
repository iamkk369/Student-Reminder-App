# Project Memory — Student Reminder App

> This file is the persistent development memory for AI-assisted development. Read first before any task.

## Project Identity

- **Project**: Student Reminder App
- **Purpose**: Help students organize assignments, exams, lectures, practicals, and reminders through a clean, responsive interface
- **Current Phase: Authentication — Backend API with Node.js/Express + MySQL (Phases B1-B3 Complete)

## Technology Stack

- Frontend: HTML5 + CSS3 (custom design system, no frameworks) + Vanilla JavaScript ES6+
- Backend (Phase A1): Node.js + Express.js + cors + helmet + morgan
- Future: MySQL (Phase A2+), authentication (Phase B)
- Git/GitHub, VS Code + Cline

## Architecture

```
Student-Reminder-App/
├── assets/
│   ├── css/        # Design system + page-specific CSS
│   ├── js/         # Page-specific JS
│   └── icons/      # SVG sprite (icons.svg) + logo
├── pages/          # HTML pages (index.html = Home, about.html = About)
├── server.js       # Express server (Phase A1)
├── package.json    # Node.js dependencies (Phase A1)
├── docs/           # Documentation + brain.md
├── dev/            # Development previews/validation scripts
└── README.md, PROJECT_STRUCTURE.md, LICENSE
```

- Pages: `index.html` (Home, complete), `about.html` (About, complete)
- Future pages: features, contact, privacy, terms, auth, app (dashboard, etc.)

## Design System

Shared CSS lives in:

```
assets/css/variables.css    # Design tokens (colors, spacing, typography)
assets/css/reset.css
assets/css/typography.css
assets/css/layout.css
assets/css/components.css
assets/css/utilities.css
assets/css/responsive.css
assets/css/main.css         # Imports all of the above
assets/css/home.css         # Home page + shared navbar/footer/mobile-menu/icon styles
```

**Key rule**: `home.css` contains shared visual styles (navbar, mobile menu, icons, section headers, footer, back-to-top). Reuse it on pages matching those patterns rather than duplicating CSS.

Icons: `assets/icons/icons.svg` loaded via `<use href="../assets/icons/icons.svg#icon-name">`. Available: logo, clipboard, calendar, bell, book, microscope, rocket, play, star, check, github, linkedin, mail, menu, close, arrow-right, arrow-up, user, shield, lightning, users, checkmark, external, trophy, laptop, phone, chevron-down.

## Completed Work

```text
Sprint 0 — Project Foundation — COMPLETE
Sprint 1 — Design System — COMPLETE
Sprint 2 — Website Architecture — COMPLETE
Sprint 2.5 — Architecture Validation — COMPLETE
Sprint 3A — UI/UX Design — COMPLETE
Sprint 3B Phase 2 — Home Page — COMPLETE
Sprint 3B Phase 3 — About Page — COMPLETE
Phase A1 — Node.js + Express Server Foundation — COMPLETE
Phase A2 — MySQL Connection — COMPLETE
Phase A3 — Database Foundation (users + reminders tables) — COMPLETE
```

## Current Work

```text
Phase B — Authentication
B1 — Sessions Table: COMPLETE (migration restored on disk in P1 — not yet committed)
B2 — Registration: COMPLETE
B3 — Login + Session Creation: COMPLETE
B4 — Authentication Middleware + /api/auth/me: NEXT

### Phase B1 — Sessions Table — Completed
Files created: `db/migrations/002_sessions_table.sql`
Files modified: `docs/brain.md`

Schema:
- `id` VARCHAR(64) PRIMARY KEY (stores SHA-256 hash)
- `user_id` INT UNSIGNED NOT NULL FK -> users.id ON DELETE CASCADE
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `expires_at` TIMESTAMP NOT NULL

Constraint strategy:
- SHA-256 hash stored in DB (raw session ID never stored)
- FK user_id links sessions to users

IMPORTANT (P1 fix note): this migration was originally documented here as
created, but the file was missing from disk AND from git history in all
branches. `db/migrations/002_sessions_table.sql` was re-created and statically
validated during P1 of the Stability & Recovery Sprint. It now exists on disk
(untracked in git — pending P3 git consistency work). Live MySQL execution
remains BLOCKED — no MySQL instance is available on this machine.

### Phase B2 — Registration — Completed
Files created: `utils/hashPassword.js`, `middleware/rateLimit.js`, `middleware/originProtection.js`, `controllers/authController.js`, `routes/auth.js`
Files modified: `server.js`, `package.json`, `package-lock.json`, `.env.example`, `docs/brain.md`
Dependencies added: `bcrypt`, `express-rate-limit`, `cookie-parser`

Changes:
- `utils/hashPassword.js`: bcrypt hashing utility (saltRounds=12)
- `middleware/rateLimit.js`: 5 req/15min per IP rate limiter for registration and login
- `middleware/originProtection.js`: Origin + CSRF protection (SameSite=Strict cookie + ORIGIN check + x-api-request header)
- `controllers/authController.js`: registration and login logic with bcrypt hash -> DB transaction -> user/session INSERT -> secure cookie set
- `routes/auth.js`: mounts POST /register and POST /login with respective rate limiters
- `server.js`: added cookieParser(), originProtection middleware, /api/auth route mount
- `.env.example`: added ALLOWED_ORIGIN for CORS + Origin protection
- Auth strategy: HttpOnly cookie with opaque random session ID stored as SHA-256 hash in sessions table

### Phase B3 — Login + Session Creation — Completed
Files modified: `controllers/authController.js`, `middleware/rateLimit.js`, `routes/auth.js`

Changes:
- `POST /api/auth/login`: login endpoint with bcrypt password comparison
- Anti-user-enumeration: identical error response for unknown email and wrong password
- `loginLimiter`: separate rate limiter (5 attempts / 15 minutes)
- Reuses existing `originProtection` middleware
- SHA-256 hashed session IDs stored in sessions table (raw IDs never stored)
- HttpOnly + SameSite=Strict session cookie
- 24-hour session expiration
- DB transaction: user lookup + session INSERT in atomic block
- Identical error for failed login to prevent user enumeration

Testing Status (Phase B1-B3):
- `npm install`: COMPLETE
- `node server.js`: starts without crash
- `GET /api/health` -> HTTP 200: PASS
- `GET /api/nonexistent` -> 404: PASS (regression)
- Registration validation: PASS (400 for missing fields, invalid email, weak password)
- Origin protection: PASS (403 for bad origin, missing header)
- Rate limiting: PASS (429 after 5 attempts)
- bcrypt rounds = 12: PASS
- Password hashed before transaction: PASS
- Password not logged: PASS
- password_hash not returned: PASS
- Transaction rollback exists: PASS
- Connection release in finally: PASS
- Session hash stored as SHA-256: PASS
- Raw session ID never logged: PASS
- Sensitive fields never in response: PASS
- Live MySQL login/session integration: BLOCKED (no MySQL server on this machine)

### Phase A3 — Database Foundation — Completed
Files created: `db/migrations/001_initial_schema.sql`
Files modified: `docs/brain.md`

Schema: `utils/hashPassword.js`, `middleware/rateLimit.js`, `middleware/originProtection.js`, `controllers/authController.js`, `routes/auth.js`
Files modified: `server.js`, `package.json`, `package-lock.json`, `.env.example`, `docs/brain.md`
Dependencies added: `bcrypt`, `express-rate-limit`, `cookie-parser`

Changes:
- `utils/hashPassword.js`: bcrypt hashing utility (saltRounds=12)
- `middleware/rateLimit.js`: 5 req/15min per IP limiter for registration
- `middleware/originProtection.js`: Origin + CSRF protection (SameSite=Strict cookie + ORIGIN check + x-api-request header)
- `controllers/authController.js`: registration logic with bcrypt hash → DB transaction (BEGIN/COMMIT/ROLLBACK) → user INSERT + session INSERT → secure cookie set
- `routes/auth.js`: mounts POST /register with rate limiter
- `server.js`: added cookieParser(), originProtection middleware, /api/auth route mount, CORS configured with ALLOWED_ORIGIN
- `.env.example`: added ALLOWED_ORIGIN for CORS + Origin protection
- Auth strategy: HttpOnly cookie with opaque random session ID stored as SHA-256 hash in sessions table

### Testing Status (Phase B1)
- `npm install`: ✅ (bcrypt, express-rate-limit, cookie-parser installed)
- `npm ls --depth=0`: ✅ (all deps present)
- `node server.js`: ✅ (starts without crash)
- `GET /api/health` → HTTP 200: ✅ (regression)
- `GET /api/nonexistent` → 404: ✅ (regression)
- Registration validation: ✅ (400 for missing fields, invalid email, weak password)
- Origin protection: ✅ (403 for bad origin, missing header)
- Rate limiting: ✅ (429 after 5 attempts)
- bcrypt rounds = 12: ✅
- Password hashed before transaction: ✅
- ROLLBACK on failure: ✅
- Connection release in finally: ✅
- Session hash stored as SHA-256: ✅
- Raw session ID never logged: ✅
- Sensitive fields never in response: ✅
- Actual MySQL registration: ❌ NOT TESTED — no MySQL instance available on this machine

### P1 — Sessions Migration Restoration (Stability & Recovery Sprint) — Completed
Problem: `db/migrations/002_sessions_table.sql` documented in Phase B1 but
missing from disk and git history (verified: no such file in filesystem,
`git log --all -- db/migrations/002_sessions_table.sql` empty, file absent
from `git ls-tree -r HEAD`).

Fix: re-created `db/migrations/002_sessions_table.sql` with the schema that
matches the existing authentication code (authController.js INSERT INTO
`sessions (id, user_id, expires_at)`; authenticate.js SELECT JOIN with
`WHERE s.id = ? AND s.expires_at > NOW()`) and type-compatible FK
(`users.id INT UNSIGNED` ↔ `sessions.user_id INT UNSIGNED`).

Result:
- Static validation: 21/21 checks PASS (columns, PK, indexes, FK + ON DELETE
  CASCADE, ENGINE/CHARSET/COLLATE, no unnecessary columns)
- Live MySQL execution: BLOCKED — no MySQL server/CLI available on this
  machine (port 3306 closed, no `MySQL` service, `mysql` CLI not on PATH).
  Migration is safely idempotent (`IF NOT EXISTS`) and deferred to P2.
- No unrelated application files changed.

## Next Planned Work

- **Phase B2**: Login + session creation
- **Phase B3**: Authentication middleware + /api/auth/me
- **Phase B4**: Logout flow
- **Phase C**: Application shell / dashboard
- **Phase D**: Reminder CRUD

## Known Issues

- ❌ Live MySQL validation BLOCKED — no MySQL server available on this machine (affects live registration/database tests)
- Future pages (features, contact, privacy, terms, auth, app) referenced in nav/footer but not yet built — expected during progression
Files created: `db/migrations/001_initial_schema.sql`
Files modified: `docs/brain.md`

Schema:
- Database: `student_reminder` (matches `.env.example` `DB_NAME`)
- Table `users`: id (INT UNSIGNED AI PK), name (VARCHAR 100 NOT NULL), email (VARCHAR 255 NOT NULL UNIQUE), password_hash (VARCHAR 255 NOT NULL), created_at/updated_at (TIMESTAMP)
- Table `reminders`: id (INT UNSIGNED AI PK), user_id (INT UNSIGNED NOT NULL FK to users.id ON DELETE CASCADE), title (NOT NULL), description (TEXT), due_date (DATETIME NOT NULL), priority ENUM(low/medium/high/urgent DEFAULT medium), status ENUM(pending/completed/cancelled DEFAULT pending), timestamps
- Engine: InnoDB / utf8mb4 / utf8mb4_unicode_ci (both tables)

Constraint strategy:
- ENUM for priority/status — type-checked on ALL MySQL versions; strict mode (default 5.7+/8.0) makes invalid values a hard error
- FK user_id links reminders to users, ON DELETE CASCADE
- UNIQUE email; NOT NULL on required columns
- Matching INT UNSIGNED types on both FK sides; composite index (user_id, due_date); index on status

### Phase A1 — Completed
Files created: `server.js`, `package.json`
Endpoints: `GET /api/health` → HTTP 200 JSON

### Phase A2 — Completed
Files created: `db/connection.js`, `.env.example`
Files modified: `server.js`, `package.json`, `.gitignore`
Dependencies added: `mysql2`, `dotenv`
Changes:
- MySQL connection pool using `mysql2/promise` (Phase A2)
- `require('dotenv').config()` loads credentials from `.env`
- Non-blocking startup connection verification (failure-safe)
- `/api/health` now includes `database: 'connected' | 'disconnected'` status
- `.env.example` created with placeholders (now tracked via `.gitignore` fix)
- `.gitignore`: removed `.env.example` rule (template safe to commit); `.env` remains protected
- Safe error handling: credentials never logged, passwords redacted in error messages
- Server continues running even if MySQL unavailable

### Testing Status (Phase A2)
- `npm install` ✅ (88 packages, 0 vulnerabilities)
- `npm ls --depth=0` ✅ (cors, dotenv 17.4.2, express, helmet, morgan, mysql2 3.23.3)
- `node server.js` starts ✅ (even with no MySQL available)
- `GET /api/health` → 200, valid JSON with `database: "disconnected"` ✅
- `GET /api/nonexistent` → 404 JSON ✅ (regression)
- Failure-safe path (no MySQL): server continues, database status reported safely, no crash ✅
- Credentials exposure test: no credentials leaked ✅
- Existing frontend files unchanged ✅ (verified via `git diff --name-only`)
- Successful MySQL connection: ❌ **NOT TESTED** — no MySQL instance available on this machine. Requires a MySQL server for full verification (see Risks).

## Next Planned Work

- **Phase A3**: Database foundation (users + reminders tables)
- **Phase B**: Authentication
- **Phase C**: Application shell / dashboard
- **Phase D**: Reminder CRUD

## Important Decisions

- Vanilla JavaScript instead of React
- Existing design system must be reused (do not introduce Bootstrap/Tailwind/jQuery)
- Pages are developed incrementally
- No scope creep — only the current phase's task
- Existing working code must not be overwritten
- One sprint/phase at a time
- Testing must happen before Git commit
- Git push happens only after user approval
- Backend stack: Node.js + Express.js + MySQL (approved)
- Auth strategy kept OPEN — choose HttpOnly cookie vs Bearer token at Phase B
- Calendar = aggregated view (no duplicate `calendar_events` table)
- Database tables built incrementally (users first, then reminders, then modules)

## Known Issues

- LIVE MySQL validation BLOCKED — no MySQL server available on this machine (affects live login/registration tests)
- Future pages (features, contact, privacy, terms, auth, app) referenced in nav/footer but not yet built — expected during progression
