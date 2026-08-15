# Project Memory — Student Reminder App

> This file is the persistent development memory for AI-assisted development. Read first before any task.

## Project Identity

- **Project**: Student Reminder App
- **Purpose**: Help students organize assignments, exams, lectures, practicals, and reminders through a clean, responsive interface
- **Current Phase**: Backend foundation — Node.js/Express (Phase A1), frontend prototype complete

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
```

## Current Work

```text
CURRENT TASK:
Phase A2 — MySQL Connection
```

### Phase A1 — Completed
Files created: `server.js`, `package.json`
Dependencies: express, cors, helmet, morgan
Endpoints: `GET /api/health` → HTTP 200 JSON
`.env.example` NOT created — not needed until Phase A2 (DB credentials)
`.gitignore` NOT modified — already covers `node_modules/`, `.env`, `*.log`

### Testing Status (Phase A1)
- `npm install` ✅ (76 packages, 0 vulnerabilities)
- `node server.js` starts ✅
- `GET /api/health` → 200, valid JSON ✅
- 404 handler → 404 JSON ✅
- Existing frontend files unchanged ✅

## Next Planned Work

- **Phase A2**: MySQL connection (`db/connection.js`, `mysql2`, `.env`)
- **Phase A3**: Database foundation (users + reminders tables)
- **Phase B**: Authentication

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

- None currently. Future pages (features, contact, privacy, terms, auth, app) are referenced in nav/footer but not yet built — expected during progression.
