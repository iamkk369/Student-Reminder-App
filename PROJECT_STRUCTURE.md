# Project Structure

> **Version**: 1.0.0  
> **Last Updated**: Sprint 0 - Project Foundation  
> **Status**: Active

This document provides a comprehensive overview of the Student Reminder App project structure, explaining the purpose of each folder and file.

## Root Level

```
Student-Reminder-App/
├── .gitignore          # Git ignore file - excludes unnecessary files from version control
├── LICENSE             # MIT License file - project licensing information
├── README.md           # Project documentation - overview, setup, and features
├── PROJECT_STRUCTURE.md # This file - detailed structure explanation
├── assets/             # Static assets (CSS, JS, images, icons, fonts)
├── components/         # Reusable HTML components
├── pages/              # Application pages/views
└── docs/               # Project documentation
```

## Folder Details

### assets/

Contains all static assets organized by type for optimal performance and maintainability.

```
assets/
├── css/                # Stylesheets
│   └── (CSS files will be added in future sprints)
│
├── js/                 # JavaScript files
│   └── (JavaScript files will be added in future sprints)
│
├── images/             # Image assets
│   ├── logos/          # Logo variations (SVG, PNG)
│   ├── icons/          # Raster icons (PNG, JPG)
│   ├── backgrounds/    # Background images and patterns
│   └── illustrations/  # Illustrations and graphics
│
├── icons/              # Icon assets
│   ├── svg/            # SVG icons (preferred for scalability)
│   └── fonts/          # Icon fonts (if used in future)
│
└── fonts/              # Custom fonts
    ├── custom-fonts/   # Web fonts (WOFF, WOFF2, TTF)
    └── system-fonts.css # System font declarations
```

**Purpose**: Centralized location for all static assets. This separation allows for:

- ✓ Easy asset management and optimization
- ✓ Clear organization by file type
- ✓ Simplified build processes (future)
- ✓ Better caching strategies

### components/

Reusable UI components that can be included across multiple pages.

```
components/
├── header.html         # Site header component (logo, navigation)
├── footer.html         # Site footer component (links, copyright)
├── navigation.html     # Navigation menu component
├── modals/             # Modal dialogs (future)
│   ├── alert-modal.html
│   └── confirm-modal.html
└── widgets/            # Reusable widgets (future)
    ├── reminder-card.html
    ├── stats-widget.html
    ├── calendar-widget.html
    └── search-bar.html
```

**Purpose**: Promotes code reuse and consistency. Components are:

- ✓ Self-contained HTML snippets
- ✓ Reusable across multiple pages
- ✓ Maintainable in a single location
- ✓ Easy to update globally

**Usage**: Components will be included in pages using:

- Server-side includes (future Node.js/Express)
- JavaScript fetch and injection
- Build tool concatenation (future)

### pages/

Individual HTML pages representing different views of the application.

```
pages/
├── index.html          # Home/Landing page
├── login.html          # User authentication page
├── register.html       # User registration page
├── dashboard.html      # Main dashboard with overview
├── assignments.html    # Assignment management page
├── examinations.html   # Examination scheduler page
├── lectures.html       # Lecture schedule page
├── practicals.html     # Practical sessions page
├── calendar.html       # Calendar view page
├── reminders.html      # All reminders list page
├── profile.html        # User profile page
└── settings.html       # Application settings page
```

**Purpose**: Each file represents a distinct page/view in the application. This separation:

- ✓ Keeps pages independent and focused
- ✓ Simplifies navigation and routing (future)
- ✓ Makes it easy to add/remove pages
- ✓ Follows semantic URL structure

### docs/

Project documentation and guidelines.

```
docs/
├── design-guidelines.md    # Design system and UI guidelines
├── coding-standards.md     # Coding conventions and best practices
└── api-specification.md    # API documentation (future)
```

**Purpose**: Centralized documentation for:

- ✓ Design consistency across the team
- ✓ Coding standards enforcement
- ✓ Onboarding new developers
- ✓ Maintaining project quality

## File Organization Principles

### Naming Conventions

1. **Folders**: All lowercase with hyphens for multi-word names
   - Example: `assets/css`, `components/navigation`

2. **Files**: Kebab-case for all files
   - HTML: `login-form.html`, `user-profile.html`
   - CSS: `main.css`, `button-styles.css`
   - JS: `auth-service.js`, `date-utils.js`

3. **Classes/IDs**: BEM methodology with lowercase and hyphens
   - Example: `.reminder-card`, `.reminder-card__title`, `.reminder-card--highlighted`

### Path References

When referencing files from HTML pages:

```html
<!-- From pages/dashboard.html -->
<link rel="stylesheet" href="../assets/css/main.css" />
<script src="../assets/js/dashboard.js"></script>
<img src="../assets/images/logos/logo.svg" alt="Logo" />

<!-- When including components -->
<div id="header"></div>
<script src="../assets/js/include-components.js"></script>
```

### Asset Loading Strategy

**CSS**: Load in `<head>` for critical above-the-fold styles

```html
<link rel="stylesheet" href="../assets/css/main.css" />
```

**JavaScript**: Load at end of `<body>` for better performance

```html
<script src="../assets/js/main.js"></script>
```

## Future Considerations

### When Backend is Added (Node.js/Express)

```
Student-Reminder-App/
├── server/                 # Backend server code (future)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── api/                    # API documentation (future)
│   └── endpoints.md
└── package.json            # Node.js dependencies (future)
```

### When Build Tools are Added (Future)

```
Student-Reminder-App/
├── dist/                   # Compiled/bundled output
├── src/                    # Source files (if using preprocessors)
│   ├── scss/
│   ├── js/
│   └── images/
└── webpack.config.js       # Build configuration
```

### Testing Structure (Future)

```
Student-Reminder-App/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── jest.config.js
```

## Scalability Considerations

### Current Structure (Sprint 0)

The current structure is designed to be:

- ✓ **Simple**: Easy to understand and navigate
- ✓ **Flexible**: Can grow without major reorganization
- ✓ **Standards-compliant**: Follows industry best practices
- ✓ **Framework-agnostic**: Works with vanilla JS, ready for future frameworks

### Growth Path

As the project grows:

1. **Sprints 1-3**: Add pages, components, and basic styles
2. **Sprints 4-6**: Introduce modular JavaScript, CSS organization
3. **Sprint 7+**: Add backend, build tools, testing frameworks
4. **Future**: Consider component frameworks, advanced tooling

---

## Version History

| Version | Date     | Changes                   | Author           |
| ------- | -------- | ------------------------- | ---------------- |
| 1.0.0   | Sprint 0 | Initial project structure | Development Team |

### Best Practices

1. **Keep it flat**: Don't create deeply nested folders unless necessary
2. **Group by type**: Separate concerns (styles, scripts, images)
3. **Be consistent**: Follow naming conventions strictly
4. **Document changes**: Update this file when structure evolves
5. **Avoid redundancy**: Don't duplicate files or folders
6. **Think ahead**: Organize for future growth, but don't over-engineer

## Version Control Strategy

### What to Commit

- All HTML, CSS, and JavaScript files
- Documentation files (README, docs, etc.)
- Configuration files (.gitignore, etc.)
- License and project structure files

### What NOT to Commit

- `node_modules/` (dependencies)
- IDE configuration files (`.vscode/`, `.idea/`)
- Build outputs (`dist/`, `build/`)
- Environment files (`.env`)
- OS generated files (`.DS_Store`, `Thumbs.db`)
- Temporary files and logs

### Git Workflow

1. **Main branch**: `main` - production-ready code
2. **Development branch**: `develop` - integration branch
3. **Feature branches**: `feature/feature-name` - new features
4. **Bug fix branches**: `fix/bug-description` - bug fixes
5. **Documentation branches**: `docs/update-name` - documentation updates

## Maintenance

### Regular Tasks

- Review and update folder structure as project grows
- Refactor components when they become too large
- Update documentation when standards change
- Clean up unused files and assets
- Review .gitignore periodically

### When to Reorganize

- When a folder contains more than 10-15 files
- When files can be logically grouped into subfolders
- When file names become too long or unclear
- When the structure no longer reflects the project's needs

---

**Note**: This structure is the foundation for Sprint 0. It will evolve as the project grows through subsequent sprints. Always refer to this document when adding new files or folders to maintain consistency.
