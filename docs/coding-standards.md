# Coding Standards

> **Version**: 1.0.0  
> **Last Updated**: Sprint 0 - Project Foundation  
> **Status**: Active  
> **Enforcement**: Required for all code commits

This document defines the coding standards and conventions for the Student Reminder App. All contributors must follow these guidelines to maintain code quality, readability, and consistency across the project.

## HTML Conventions

### General Principles

- Use semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`, etc.)
- Always include the `lang` attribute on the `<html>` element
- Use lowercase for all HTML tags and attributes
- Use double quotes for attribute values
- Close all tags properly
- Indent nested elements with 2 spaces
- Add a single blank line between block-level elements
- Include `alt` text for all images
- Use descriptive `id` and `class` names

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Page description for SEO" />
    <title>Page Title - Student Reminder App</title>
    <link rel="stylesheet" href="../assets/css/main.css" />
  </head>
  <body>
    <header class="site-header">
      <!-- Header content -->
    </header>

    <main class="main-content">
      <!-- Main content -->
    </main>

    <footer class="site-footer">
      <!-- Footer content -->
    </footer>

    <script src="../assets/js/main.js"></script>
  </body>
</html>
```

### Attribute Order

1. `class`
2. `id`
3. `data-*`
4. `src`, `href`, `alt`
5. `type`, `name`, `value`
6. Other attributes

## CSS Conventions

### General Principles

- Use BEM (Block Element Modifier) naming methodology
- Use lowercase with hyphens for class names
- Use 2 spaces for indentation
- Place opening brace on the same line as the selector
- Use single quotes for attribute selectors and content values
- Group related properties together
- Add a space after colons in property declarations
- End declarations with a semicolon
- Use shorthand properties when possible

### Organization

```css
/* 1. Imports */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

/* 2. Variables */
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1e40af;
  --font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 3. Reset and Base */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 4. Layout */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 5. Components */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary {
  background-color: var(--color-primary);
  color: #ffffff;
}

.btn--primary:hover {
  background-color: var(--color-primary-dark);
}

/* 6. Utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Naming Convention (BEM)

```
.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }
```

**Examples:**

- Block: `.card`, `.button`, `.form`
- Element: `.card__header`, `.card__body`, `.card__footer`
- Modifier: `.card--highlighted`, `.button--primary`, `.button--large`

### Property Order

Within a rule set, order properties logically:

1. Positioning (`position`, `top`, `right`, `bottom`, `left`, `z-index`)
2. Box model (`display`, `flex`, `grid`, `width`, `height`, `margin`, `padding`)
3. Typography (`font-family`, `font-size`, `font-weight`, `line-height`, `text-align`)
4. Visual (`color`, `background`, `border`, `border-radius`, `box-shadow`)
5. Other (`transition`, `animation`, `cursor`)

## JavaScript Conventions

### General Principles

- Use ES6+ syntax
- Use `const` and `let` instead of `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use destructuring for objects and arrays
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use camelCase for variables and functions
- Use PascalCase for classes and constructors
- Use UPPERCASE for constants
- Add JSDoc comments for functions

### File Structure

```javascript
// 1. Imports (if using modules in future)
// import { utilityFunction } from './utils.js';

// 2. Constants
const API_BASE_URL = "https://api.example.com";
const STORAGE_KEY = "student_reminder_data";

// 3. DOM Elements
const loginForm = document.getElementById("login-form");
const submitButton = document.querySelector(".btn-submit");

// 4. State Management
let currentUser = null;
let reminders = [];

// 5. Utility Functions
/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 6. Event Handlers
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get("email");

  if (isValidEmail(email)) {
    processLogin(email);
  } else {
    showError("Please enter a valid email address");
  }
}

// 7. API Functions (for future backend integration)
async function fetchReminders() {
  try {
    const response = await fetch(`${API_BASE_URL}/reminders`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
}

// 8. Initialization
function init() {
  if (loginForm) {
    loginForm.addEventListener("submit", handleSubmit);
  }

  loadStoredData();
}

// 9. Start the application
document.addEventListener("DOMContentLoaded", init);
```

### Naming Conventions

| Type              | Convention                 | Example                                    |
| ----------------- | -------------------------- | ------------------------------------------ |
| Variables         | camelCase                  | `userName`, `totalReminders`               |
| Functions         | camelCase                  | `getUserData()`, `validateInput()`         |
| Classes           | PascalCase                 | `UserManager`, `ReminderService`           |
| Constants         | UPPERCASE                  | `MAX_ITEMS`, `API_URL`                     |
| Private variables | \_camelCase                | `_internalState`, `_cache`                 |
| DOM elements      | camelCase with type prefix | `loginForm`, `submitButton`                |
| Booleans          | is/has/should prefix       | `isValid`, `hasPermission`, `shouldRender` |
| Event handlers    | handle prefix              | `handleClick()`, `handleSubmit()`          |

### Error Handling

```javascript
// Always use try-catch for async operations
async function loadData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("Failed to load data:", error);
    showErrorMessage("Unable to load data. Please try again.");
    return null;
  }
}

// Validate inputs before processing
function processUserInput(input) {
  if (!input || typeof input !== "string") {
    throw new Error("Invalid input provided");
  }

  // Process input
}
```

### Comments

```javascript
// Single-line comments for brief explanations

/*
 * Multi-line comments for detailed explanations
 * Use for function descriptions, complex logic, or TODOs
 */

/**
 * JSDoc comments for functions
 * @param {type} paramName - Description
 * @returns {type} Description
 */
```

## Naming Conventions Summary

### Files and Folders

- Use **lowercase** for all folder names
- Use **kebab-case** for file names (e.g., `user-profile.html`, `auth-service.js`)
- Use **descriptive names** that clearly indicate purpose
- Avoid abbreviations unless they are universally understood

**Examples:**

```
✓ assets/css/main.css
✓ assets/js/auth-service.js
✓ components/header-component.html
✓ pages/user-dashboard.html
✗ assets/css/style.css (too generic)
✗ assets/js/scr.js (unclear abbreviation)
✗ pages/page1.html (not descriptive)
```

### Classes and IDs in HTML

```html
<!-- Use meaningful, descriptive class names -->
<div class="reminder-card">
  <h2 class="reminder-card__title">Assignment Due</h2>
  <p class="reminder-card__date">2024-12-31</p>
  <button class="btn btn--primary reminder-card__action">Complete</button>
</div>

<!-- IDs should be unique and descriptive -->
<section id="assignment-section">
  <form id="assignment-form">
    <input type="text" id="assignment-title" name="title" />
  </form>
</section>
```

## Folder Conventions

### Assets Organization

```
assets/
├── css/
│   ├── main.css          # Main stylesheet
│   ├── components/       # Component-specific styles (future)
│   └── utilities/        # Utility classes (future)
├── js/
│   ├── main.js           # Main JavaScript file
│   ├── modules/          # Modular JavaScript (future)
│   └── utils.js          # Utility functions
├── images/
│   ├── logos/            # Logo variations
│   ├── icons/            # Icon images (if not using icon fonts)
│   └── backgrounds/      # Background images
├── icons/
│   ├── svg/              # SVG icons
│   └── fonts/            # Icon fonts (if used)
└── fonts/
    ├── custom-fonts/     # Custom web fonts
    └── system-fonts.css  # System font definitions
```

### Components Organization

```
components/
├── header.html           # Header component
├── footer.html           # Footer component
├── navigation.html       # Navigation component
├── modals/               # Modal components (future)
│   ├── alert-modal.html
│   └── confirm-modal.html
└── widgets/              # Reusable widgets (future)
    ├── reminder-card.html
    └── stats-widget.html
```

### Pages Organization

```
pages/
├── index.html            # Home page
├── login.html            # Login page
├── dashboard.html        # Dashboard page
├── assignments.html      # Assignments page
├── examinations.html     # Examinations page
├── calendar.html         # Calendar page
├── profile.html          # Profile page
└── settings.html         # Settings page
```

## Git Commit Style

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `ci`: CI/CD configuration changes

### Scope (Optional)

The scope should be the module or component affected:

- `header`, `footer`, `navigation`
- `dashboard`, `assignments`, `calendar`
- `auth`, `api`, `utils`
- `styles`, `components`

### Subject

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Maximum 50 characters

### Body (Optional)

- Provide additional context if needed
- Wrap at 72 characters
- Explain what and why, not how

### Footer (Optional)

- Reference issue numbers: `Fixes #123`, `Closes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```bash
# Feature
git commit -m "feat(auth): add user login functionality

Implement email/password authentication with form validation.
Includes error handling and user feedback messages."

# Bug fix
git commit -m "fix(dashboard): resolve calendar display issue on mobile

Fix responsive layout problem where calendar widget overflowed
on screens smaller than 640px."

# Documentation
git commit -m "docs: update README with setup instructions

Add detailed setup steps and prerequisites for new developers."

# Refactor
git commit -m "refactor(utils): extract date formatting logic

Move date formatting to utility module for reuse across components."

# Multiple changes
git commit -m "feat(assignments): add assignment creation form

- Implement form with validation
- Add priority selection dropdown
- Include due date picker
- Connect to backend API (future)

Fixes #42"
```

### Commit Message Rules

- Use present tense: "Add feature" not "Added feature"
- Be descriptive but concise
- Explain the "why" in the body, not the "what"
- Reference related issues or pull requests
- Keep commits atomic (one logical change per commit)

## Code Quality Standards

### General Principles

- Write self-documenting code with clear variable and function names
- Keep functions small and focused (single responsibility)
- Avoid deep nesting (max 3-4 levels)
- Use comments to explain "why", not "what"
- Remove commented-out code before committing
- Avoid magic numbers; use named constants
- Handle errors gracefully
- Write DRY (Don't Repeat Yourself) code

### Performance

- Minimize DOM manipulations
- Use event delegation where appropriate
- Optimize images and assets
- Lazy load non-critical resources
- Use CSS transforms for animations

### Security

- Sanitize user input
- Validate data on client and server (future)
- Use HTTPS for API calls (future)
- Avoid exposing sensitive data in client-side code
- Implement proper authentication and authorization (future)

---

## Linting & Code Review

### Automated Checks

All code must pass automated linting before commit:

- **HTML**: Use W3C validator or htmlhint
- **CSS**: Use stylelint with BEM plugin
- **JavaScript**: Use ESLint with recommended rules

### Code Review Checklist

Before submitting a pull request:

- [ ] Code follows all conventions in this document
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] All functions have JSDoc comments (if public)
- [ ] All variables have meaningful names
- [ ] No magic numbers (use named constants)
- [ ] Error handling is implemented
- [ ] Accessibility attributes are included
- [ ] Responsive design is tested
- [ ] Cross-browser compatibility is verified

---

## Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript reference
- [W3C HTML Specification](https://html.spec.whatwg.org/) - HTML5 standards
- [CSS-Tricks](https://css-tricks.com/) - CSS techniques and best practices
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [BEM Documentation](https://en.bem.info/) - BEM methodology guide
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format

---

**Note**: These standards should be enforced through code reviews and automated linting tools. All code must pass linting checks before being merged.
