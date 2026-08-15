# Project Memory — Student Reminder App

> This file is the persistent development memory for AI-assisted development. Read first before any task.

## Project Identity

- **Project**: Student Reminder App
- **Purpose**: Help students organize assignments, exams, lectures, practicals, and reminders through a clean, responsive interface
- **Current Phase**: Frontend/prototype development (public pages, sequential)

## Technology Stack

- HTML5
- CSS3 (custom design system, no frameworks)
- Vanilla JavaScript ES6+
- Git/GitHub
- VS Code + Cline
- Future: Node.js, Express.js, MySQL (NOT implemented — frontend only)

## Architecture

```
Student-Reminder-App/
├── assets/
│   ├── css/        # Design system + page-specific CSS
│   ├── js/         # Page-specific JS
│   └── icons/      # SVG sprite (icons.svg) + logo
├── pages/          # HTML pages (index.html = Home, about.html = About)
├── docs/           # Documentation + brain.md + development-status.md
├── dev/            # Development previews/validation scripts
└── README.md, PROJECT_STRUCTURE.md, LICENSE
```

- Pages: `index.html` (Home, complete), `about.html` (About, current)
- Future pages: features, contact, privacy, terms, auth, dashboard, etc.

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
Sprint 3B Phase 3 — About Page — CURRENT
```

## Current Work

```text
CURRENT TASK:
About Page implementation
```

Files created: `pages/about.html`, `assets/css/about.css`, `docs/brain.md`
Files modified: `README.md`

## Next Planned Work

- Features Page (per website-architecture public pages list)

## Important Decisions

- Vanilla JavaScript instead of React
- Existing design system must be reused (do not introduce Bootstrap/Tailwind/jQuery)
- Pages are developed incrementally
- No scope creep — only the current sprint's page
- Existing working code must not be overwritten
- One sprint/phase at a time
- Testing must happen before Git commit
- Git push happens only after user approval
- About page loads `home.css` for shared navbar/footer/icon/mobile-menu styles, plus `about.css` for page-specific styles (prevents CSS duplication)

## Known Issues

- None currently. Future pages (features, contact, privacy, terms) are referenced in nav/footer but not yet built — expected during progression.
