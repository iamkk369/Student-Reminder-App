# Design System Documentation

> **Version**: 1.0.0  
> **Last Updated**: Sprint 1 - Design System & UI Foundation  
> **Status**: Active  
> **Author**: iamkk369

This document provides comprehensive documentation for the Student Reminder App design system. It serves as the single source of truth for all UI components, design tokens, and styling patterns.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Typography](#typography)
3. [Color Palette](#color-palette)
4. [Spacing System](#spacing-system)
5. [Layout](#layout)
6. [Components](#components)
7. [Utilities](#utilities)
8. [Responsive Design](#responsive-design)
9. [Accessibility](#accessibility)
10. [Usage Examples](#usage-examples)

---

## Design Tokens

Design tokens are the visual design atoms of the design system — specifically, they are the named entities that store visual design attributes. They are used in place of hard-coded values to ensure consistency across platforms.

### Location

All design tokens are defined in: `assets/css/variables.css`

### Usage

```css
.my-element {
  color: var(--text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

---

## Typography

### Font Family

**Primary Font**: System font stack for optimal performance

```css
font-family: var(--font-family);
/* -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif */
```

**Monospace Font**: For code snippets and data

```css
font-family: var(--font-family-mono);
/* "SF Mono", Monaco, Inconsolata, "Fira Code", "Fira Mono", monospace */
```

### Font Sizes

| Token              | Size            | Usage                   |
| ------------------ | --------------- | ----------------------- |
| `--font-size-xs`   | 0.75rem (12px)  | Captions, labels        |
| `--font-size-sm`   | 0.875rem (14px) | Small text, helper text |
| `--font-size-base` | 1rem (16px)     | Body text, default      |
| `--font-size-lg`   | 1.125rem (18px) | Large body text         |
| `--font-size-xl`   | 1.25rem (20px)  | Subtitles               |
| `--font-size-2xl`  | 1.5rem (24px)   | H3 headings             |
| `--font-size-3xl`  | 1.875rem (30px) | H2 headings             |
| `--font-size-4xl`  | 2.25rem (36px)  | H1 headings             |

### Font Weights

| Token                    | Weight | Usage                  |
| ------------------------ | ------ | ---------------------- |
| `--font-weight-normal`   | 400    | Body text              |
| `--font-weight-medium`   | 500    | Buttons, labels        |
| `--font-weight-semibold` | 600    | Subtitles, card titles |
| `--font-weight-bold`     | 700    | Headings               |

### Line Heights

| Token                   | Value | Usage           |
| ----------------------- | ----- | --------------- |
| `--line-height-tight`   | 1.2   | Headings        |
| `--line-height-snug`    | 1.375 | Tight text      |
| `--line-height-normal`  | 1.5   | Body text       |
| `--line-height-relaxed` | 1.625 | Lead paragraphs |

### Heading Styles

Pre-defined heading styles follow a clear hierarchy:

- **H1**: 2.25rem, bold, tight line height, letter-spacing -0.02em
- **H2**: 1.875rem, bold, tight line height, letter-spacing -0.01em
- **H3**: 1.5rem, bold
- **H4**: 1.25rem, bold
- **H5**: 1.125rem, semibold
- **H6**: 1rem, semibold, uppercase, letter-spacing 0.05em

### Text Utilities

**Alignment**:

- `.text-left` - Align text left
- `.text-center` - Align text center
- `.text-right` - Align text right
- `.text-justify` - Justify text

**Colors**:

- `.text-primary` - Primary text color
- `.text-secondary` - Secondary text color
- `.text-tertiary` - Tertiary text color
- `.text-muted` - Muted text color
- `.text-success` - Success color
- `.text-warning` - Warning color
- `.text-error` - Error color
- `.text-info` - Info color
- `.text-inverse` - Inverse text color

**Transformations**:

- `.uppercase` - Uppercase text
- `.lowercase` - Lowercase text
- `.capitalize` - Capitalize text
- `.italic` - Italic style
- `.truncate` - Truncate with ellipsis

---

## Color Palette

### Primary Brand Colors (Blue)

| Token                 | Hex Code | Usage                   |
| --------------------- | -------- | ----------------------- |
| `--color-primary-50`  | #eff6ff  | Light backgrounds       |
| `--color-primary-100` | #dbeafe  | Subtle highlights       |
| `--color-primary-200` | #bfdbfe  | Hover backgrounds       |
| `--color-primary-300` | #93c5fd  | Borders                 |
| `--color-primary-400` | #60a5fa  | Light accents           |
| `--color-primary-500` | #2563eb  | **Primary brand color** |
| `--color-primary-600` | #1d4ed8  | Primary buttons         |
| `--color-primary-700` | #1e40af  | Hover states            |
| `--color-primary-800` | #1e3a8a  | Active states           |
| `--color-primary-900` | #172554  | Dark accents            |

### Secondary Brand Colors (Purple)

| Token                   | Hex Code | Usage                 |
| ----------------------- | -------- | --------------------- |
| `--color-secondary-50`  | #f5f3ff  | Light backgrounds     |
| `--color-secondary-100` | #ede9fe  | Subtle highlights     |
| `--color-secondary-500` | #7c3aed  | Secondary brand color |
| `--color-secondary-600` | #6d28d9  | Secondary buttons     |
| `--color-secondary-700` | #5b21b6  | Hover states          |

### Neutral Colors (Grayscale)

| Token              | Hex Code | Usage              |
| ------------------ | -------- | ------------------ |
| `--color-gray-50`  | #f9fafb  | Light backgrounds  |
| `--color-gray-100` | #f3f4f6  | Subtle backgrounds |
| `--color-gray-200` | #e5e7eb  | Light borders      |
| `--color-gray-300` | #d1d5db  | Borders            |
| `--color-gray-400` | #9ca3af  | Disabled text      |
| `--color-gray-500` | #6b7280  | Tertiary text      |
| `--color-gray-600` | #4b5563  | Secondary text     |
| `--color-gray-700` | #374151  | Body text          |
| `--color-gray-800` | #111827  | Primary text       |
| `--color-gray-900` | #030712  | Headings           |

### Semantic Colors

**Success (Green)**:

- `--color-success-50`: #ecfdf5 (light background)
- `--color-success-100`: #d1fae5 (subtle background)
- `--color-success-500`: #10b981 (primary)
- `--color-success-600`: #059669 (buttons)
- `--color-success-700`: #047857 (hover)

**Warning (Amber)**:

- `--color-warning-50`: #fffbeb (light background)
- `--color-warning-100`: #fef3c7 (subtle background)
- `--color-warning-500`: #f59e0b (primary)
- `--color-warning-600`: #d97706 (buttons)
- `--color-warning-700`: #b45309 (hover)

**Error (Red)**:

- `--color-error-50`: #fef2f2 (light background)
- `--color-error-100`: #fee2e2 (subtle background)
- `--color-error-500`: #ef4444 (primary)
- `--color-error-600`: #dc2626 (buttons)
- `--color-error-700`: #b91c1c (hover)

**Info (Cyan)**:

- `--color-info-50`: #ecfeff (light background)
- `--color-info-100`: #cffafe (subtle background)
- `--color-info-500`: #06b6d4 (primary)
- `--color-info-600`: #0891b2 (buttons)
- `--color-info-700`: #0e7490 (hover)

### Background Colors

| Token            | Hex Code        | Usage                |
| ---------------- | --------------- | -------------------- |
| `--bg-primary`   | #ffffff         | Main background      |
| `--bg-secondary` | #f9fafb         | Secondary background |
| `--bg-tertiary`  | #f3f4f6         | Tertiary background  |
| `--bg-inverse`   | #111827         | Dark backgrounds     |
| `--bg-overlay`   | rgba(0,0,0,0.5) | Modal overlays       |

### Text Colors

| Token               | Hex Code | Usage                    |
| ------------------- | -------- | ------------------------ |
| `--text-primary`    | #111827  | Headings, primary text   |
| `--text-secondary`  | #374151  | Body text                |
| `--text-tertiary`   | #6b7280  | Helper text              |
| `--text-quaternary` | #9ca3af  | Placeholder text         |
| `--text-inverse`    | #ffffff  | Text on dark backgrounds |
| `--text-link`       | #2563eb  | Links                    |
| `--text-link-hover` | #1d4ed8  | Link hover               |

### Border Colors

| Token                  | Hex Code | Usage           |
| ---------------------- | -------- | --------------- |
| `--border-color`       | #d1d5db  | Default borders |
| `--border-color-light` | #e5e7eb  | Light borders   |
| `--border-color-dark`  | #9ca3af  | Dark borders    |

---

## Spacing System

The spacing system uses a 4px base grid for consistency.

| Token        | Value   | Pixels | Usage               |
| ------------ | ------- | ------ | ------------------- |
| `--space-0`  | 0       | 0px    | No spacing          |
| `--space-1`  | 0.25rem | 4px    | Tight spacing       |
| `--space-2`  | 0.5rem  | 8px    | Small gaps          |
| `--space-3`  | 0.75rem | 12px   | Medium gaps         |
| `--space-4`  | 1rem    | 16px   | Default spacing     |
| `--space-5`  | 1.25rem | 20px   | Large gaps          |
| `--space-6`  | 1.5rem  | 24px   | Section spacing     |
| `--space-8`  | 2rem    | 32px   | Major spacing       |
| `--space-10` | 2.5rem  | 40px   | Container padding   |
| `--space-12` | 3rem    | 48px   | Extra large spacing |
| `--space-16` | 4rem    | 64px   | Maximum spacing     |
| `--space-20` | 5rem    | 80px   | Hero spacing        |

### Usage Examples

```css
.element {
  padding: var(--space-4); /* 16px all sides */
  margin-bottom: var(--space-6); /* 24px bottom */
  gap: var(--space-2); /* 8px gap */
}
```

---

## Border Radius

| Token           | Value   | Pixels | Usage            |
| --------------- | ------- | ------ | ---------------- |
| `--radius-none` | 0       | 0px    | No rounding      |
| `--radius-sm`   | 0.25rem | 4px    | Inputs, badges   |
| `--radius-md`   | 0.5rem  | 8px    | Buttons, forms   |
| `--radius-lg`   | 0.75rem | 12px   | Cards, modals    |
| `--radius-xl`   | 1rem    | 16px   | Hero sections    |
| `--radius-2xl`  | 1.5rem  | 24px   | Large containers |
| `--radius-full` | 9999px  | -      | Circles, pills   |

---

## Shadows

| Token            | CSS Value                                                             | Usage            |
| ---------------- | --------------------------------------------------------------------- | ---------------- |
| `--shadow-sm`    | `0 1px 2px 0 rgba(0,0,0,0.05)`                                        | Subtle elements  |
| `--shadow-md`    | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`     | Cards, dropdowns |
| `--shadow-lg`    | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)`   | Elevated cards   |
| `--shadow-xl`    | `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` | Modals, popovers |
| `--shadow-2xl`   | `0 25px 50px -12px rgba(0,0,0,0.25)`                                  | Major overlays   |
| `--shadow-inner` | `inset 0 2px 4px 0 rgba(0,0,0,0.05)`                                  | Inset shadows    |
| `--shadow-focus` | `0 0 0 3px rgba(37,99,235,0.1)`                                       | Focus rings      |

---

## Z-Index Scale

| Token                      | Value | Usage           |
| -------------------------- | ----- | --------------- |
| `--z-index-base`           | 0     | Default content |
| `--z-index-dropdown`       | 100   | Dropdown menus  |
| `--z-index-sticky`         | 200   | Sticky headers  |
| `--z-index-modal-backdrop` | 300   | Modal overlays  |
| `--z-index-modal`          | 400   | Modal dialogs   |
| `--z-index-tooltip`        | 500   | Tooltips        |
| `--z-index-toast`          | 600   | Notifications   |

---

## Transitions

| Token                 | Value      | Usage             |
| --------------------- | ---------- | ----------------- |
| `--transition-fast`   | 150ms ease | Hover states      |
| `--transition-normal` | 200ms ease | Most interactions |
| `--transition-slow`   | 300ms ease | Page transitions  |

---

## Layout

### Container

**Location**: `assets/css/layout.css`

**Usage**:

```html
<div class="container">
  <!-- Content -->
</div>
```

**Variants**:

- `.container` - Default container (max-width: 1280px)
- `.container-fluid` - Full-width container
- `.container-sm` - Max-width: 640px
- `.container-md` - Max-width: 768px
- `.container-lg` - Max-width: 1024px
- `.container-xl` - Max-width: 1280px

### Grid System

**Location**: `assets/css/layout.css`

**Usage**:

```html
<div class="row">
  <div class="col">Column 1</div>
  <div class="col">Column 2</div>
  <div class="col">Column 3</div>
</div>
```

**Column Classes**:

- `.col` - Auto-sizing column
- `.col-auto` - Auto-width column
- `.col-1` through `.col-12` - Fixed width columns (fractions)

**No Gutters**:

```html
<div class="row no-gutters">
  <!-- Columns without padding -->
</div>
```

### Page Layout

**Wrapper**:

```html
<div class="page-wrapper">
  <header class="header">...</header>
  <main class="page-content">...</main>
  <footer class="footer">...</footer>
</div>
```

**Sections**:

- `.section` - Standard section padding
- `.section-sm` - Small section padding
- `.section-lg` - Large section padding
- `.section-xl` - Extra large section padding

---

## Components

### Buttons

**Location**: `assets/css/components.css`

**Base Button**:

```html
<button class="btn">Button Text</button>
```

**Variants**:

- `.btn-primary` - Primary action (blue)
- `.btn-secondary` - Secondary action (outlined)
- `.btn-outline` - Outlined button
- `.btn-ghost` - Ghost button (no border)
- `.btn-danger` - Destructive action (red)
- `.btn-success` - Success action (green)
- `.btn-warning` - Warning action (amber)

**Sizes**:

- `.btn-sm` - Small button
- `.btn-lg` - Large button

**States**:

- `.btn:disabled` - Disabled state
- `.btn.loading` - Loading spinner

**Button Group**:

```html
<div class="btn-group">
  <button class="btn">Left</button>
  <button class="btn">Middle</button>
  <button class="btn">Right</button>
</div>
```

### Form Elements

**Location**: `assets/css/components.css`

#### Text Input

```html
<div class="form-group">
  <label class="form-label" for="email">Email</label>
  <input
    type="email"
    id="email"
    class="form-control"
    placeholder="Enter email"
  />
  <span class="form-hint">We'll never share your email</span>
</div>
```

**Sizes**:

- `.form-control` - Default size
- `.form-control-sm` - Small input
- `.form-control-lg` - Large input

**States**:

- `.form-control.error` - Error state (red border)
- `.form-control.success` - Success state (green border)

**Label Modifiers**:

- `.form-label.required` - Adds red asterisk
- `.form-label.optional` - Adds "(optional)" text

#### Textarea

```html
<div class="form-group">
  <label class="form-label" for="message">Message</label>
  <textarea id="message" class="form-control" rows="5"></textarea>
</div>
```

#### Select

```html
<div class="form-group">
  <label class="form-label" for="priority">Priority</label>
  <select id="priority" class="form-control">
    <option>High</option>
    <option>Medium</option>
    <option>Low</option>
  </select>
</div>
```

#### Checkbox

```html
<div class="form-check">
  <input type="checkbox" id="remember" class="form-check-input" />
  <label for="remember" class="form-check-label">Remember me</label>
</div>
```

#### Radio

```html
<div class="form-check">
  <input type="radio" id="option1" name="options" class="form-check-input" />
  <label for="option1" class="form-check-label">Option 1</label>
</div>
```

#### Toggle Switch

```html
<label class="toggle-switch">
  <input type="checkbox" />
  <span class="toggle-slider"></span>
</label>
```

#### Input Group

```html
<div class="input-group">
  <input type="text" class="form-control" placeholder="Search..." />
  <button class="btn btn-primary">Search</button>
</div>
```

### Cards

**Location**: `assets/css/components.css`

**Basic Card**:

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-subtitle">Subtitle</p>
  </div>
  <div class="card-body">
    <p class="card-text">Card content goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

**Variants**:

- `.card` - Default card with shadow
- `.card-interactive` - Clickable card with enhanced hover
- `.card-flat` - Flat card without shadow
- `.card-highlighted` - Card with highlighted border

### Badges

**Location**: `assets/css/components.css`

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-info">Info</span>
```

**Sizes**:

- `.badge` - Default size
- `.badge-sm` - Small badge
- `.badge-lg` - Large badge

**With Dot**:

```html
<span class="badge badge-primary badge-dot">Active</span>
```

### Alerts

**Location**: `assets/css/components.css`

```html
<div class="alert alert-success">
  <div class="alert-icon">✓</div>
  <div class="alert-content">
    <div class="alert-title">Success</div>
    <p class="alert-message">Operation completed successfully.</p>
  </div>
  <button class="alert-close">&times;</button>
</div>
```

**Variants**:

- `.alert-success` - Success message (green)
- `.alert-warning` - Warning message (amber)
- `.alert-error` - Error message (red)
- `.alert-info` - Info message (cyan)

### Tables

**Location**: `assets/css/components.css`

```html
<table class="table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

**Modifiers**:

- `.table-striped` - Striped rows
- `.table-bordered` - Bordered table

### List Groups

**Location**: `assets/css/components.css`

```html
<div class="list-group">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item active">Item 2</div>
  <div class="list-group-item">Item 3</div>
</div>
```

### Progress Bar

**Location**: `assets/css/components.css`

```html
<div class="progress">
  <div class="progress-bar" style="width: 75%"></div>
</div>
```

**Modifiers**:

- `.progress-bar-striped` - Striped pattern
- `.progress-bar-animated` - Animated stripes

### Spinner

**Location**: `assets.css/components.css`

```html
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>
<div class="spinner spinner-lg"></div>
```

### Avatar

**Location**: `assets/css/components.css`

```html
<div class="avatar">JD</div>
<div class="avatar avatar-sm">JD</div>
<div class="avatar avatar-lg">JD</div>
<div class="avatar avatar-xl">JD</div>
```

### Tooltip

**Location**: `assets/css/components.css`

```html
<div class="tooltip">
  <button class="btn">Hover me</button>
  <span class="tooltip-text">Tooltip text</span>
</div>
```

### Breadcrumb

**Location**: `assets/css/components.css`

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item active">Current Page</li>
  </ol>
</nav>
```

### Pagination

**Location**: `assets/css/components.css`

```html
<ul class="pagination">
  <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  <li class="page-item active"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>
```

---

## Utilities

**Location**: `assets/css/utilities.css`

### Display

- `.d-none` - Display none
- `.d-block` - Display block
- `.d-inline-block` - Display inline-block
- `.d-inline` - Display inline
- `.d-flex` - Display flex
- `.d-inline-flex` - Display inline-flex
- `.d-grid` - Display grid

### Flexbox

**Direction**:

- `.flex-row` - Row direction
- `.flex-column` - Column direction
- `.flex-wrap` - Wrap
- `.flex-nowrap` - No wrap

**Justify**:

- `.justify-start` - Flex start
- `.justify-end` - Flex end
- `.justify-center` - Center
- `.justify-between` - Space between
- `.justify-around` - Space around
- `.justify-evenly` - Space evenly

**Align**:

- `.items-start` - Align start
- `.items-end` - Align end
- `.items-center` - Align center
- `.items-baseline` - Align baseline
- `.items-stretch` - Align stretch

**Flex Properties**:

- `.flex-1` - Flex: 1 1 0%
- `.flex-auto` - Flex: 1 1 auto
- `.flex-grow` - Flex-grow: 1
- `.flex-shrink-0` - Flex-shrink: 0

### Grid

- `.grid-cols-1` to `.grid-cols-12` - Grid columns
- `.col-span-1` to `.col-span-12` - Column spans
- `.gap-1` to `.gap-12` - Grid gaps

### Positioning

- `.relative`, `.absolute`, `.fixed`, `.sticky`, `.static`
- `.inset-0`, `.top-0`, `.right-0`, `.bottom-0`, `.left-0`
- `.z-0` to `.z-60` - Z-index utilities

### Sizing

- `.w-full`, `.h-full`, `.w-screen`, `.h-screen`
- `.min-h-screen` - Minimum height 100vh
- `.max-w-container` - Maximum width container

### Spacing

**Margin**:

- `.m-0`, `.mx-auto`, `.my-auto`
- `.mt-1` to `.mt-16` - Margin top
- `.mb-1` to `.mb-16` - Margin bottom
- `.ml-1` to `.ml-8` - Margin left
- `.mr-1` to `.mr-8` - Margin right

**Padding**:

- `.p-0` to `.p-8` - Padding all sides
- `.px-1` to `.px-8` - Padding left/right
- `.py-1` to `.py-8` - Padding top/bottom
- `.pt-1` to `.pt-8` - Padding top
- `.pb-1` to `.pb-8` - Padding bottom
- `.pl-1` to `.pl-8` - Padding left
- `.pr-1` to `.pr-8` - Padding right

### Border & Shadow

- `.border` - 1px border
- `.rounded-none` to `.rounded-full` - Border radius
- `.shadow-none` to `.shadow-2xl` - Box shadows

### Accessibility

- `.sr-only` - Screen reader only
- `.not-sr-only` - Reset screen reader only

---

## Responsive Design

### Breakpoints

| Breakpoint | Min Width | Target Devices |
| ---------- | --------- | -------------- |
| sm         | 640px     | Large phones   |
| md         | 768px     | Tablets        |
| lg         | 1024px    | Small desktops |
| xl         | 1280px    | Desktops       |
| 2xl        | 1536px    | Large desktops |

### Responsive Utilities

**Location**: `assets/css/responsive.css`

**Display**:

```html
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>
```

**Available Classes**:

- `.d-{breakpoint}-none` - Hide at breakpoint
- `.d-{breakpoint}-block` - Show as block
- `.d-{breakpoint}-flex` - Show as flex
- `.d-{breakpoint}-inline-flex` - Show as inline-flex
- `.d-{breakpoint}-grid` - Show as grid

**Text Alignment**:

```html
<p class="text-center text-md-left">Centered on mobile, left on tablet+</p>
```

**Margin & Padding**:

```html
<div class="mt-4 mt-lg-6">Responsive margin</div>
```

### Mobile-First Approach

All styles are written mobile-first. Base styles apply to all screen sizes, with media queries adding styles for larger screens.

```css
/* Mobile (default) */
.container {
  padding: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
  }
}
```

---

## Accessibility

### Focus States

All interactive elements have visible focus indicators:

```css
.btn:focus-visible,
.form-control:focus,
a:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Focus order follows visual layout
- Skip links can be added for keyboard users

### Screen Reader Support

- Use semantic HTML elements
- Provide alt text for images
- Use ARIA labels when necessary
- Screen reader only text: `.sr-only`

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

- Normal text: 4.5:1 minimum contrast
- Large text: 3:1 minimum contrast

### Touch Targets

Minimum touch target size: 44x44px for mobile devices

---

## Usage Examples

### Complete Page Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Reminder App</title>
    <link rel="stylesheet" href="../assets/css/main.css" />
  </head>
  <body>
    <div class="page-wrapper">
      <header class="header">
        <div class="container">
          <div class="header-content">
            <a href="#" class="header-logo">Student Reminder</a>
            <nav class="header-nav">
              <a href="#">Dashboard</a>
              <a href="#">Assignments</a>
              <a href="#">Calendar</a>
            </nav>
          </div>
        </div>
      </header>

      <main class="page-content">
        <div class="container">
          <div class="section">
            <h1>Welcome to Student Reminder App</h1>
            <p class="text-lead">Manage your academic life efficiently.</p>

            <div class="row mt-6">
              <div class="col-12 col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Assignments</h3>
                    <p class="card-text">Track your assignments</p>
                    <button class="btn btn-primary">View All</button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Exams</h3>
                    <p class="card-text">Prepare for exams</p>
                    <button class="btn btn-primary">View All</button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Calendar</h3>
                    <p class="card-text">View your schedule</p>
                    <button class="btn btn-primary">View All</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <p class="footer-copyright">&copy; 2026 Student Reminder App</p>
          </div>
        </div>
      </footer>
    </div>

    <script src="../assets/js/main.js"></script>
  </body>
</html>
```

### Form Example

```html
<form class="form">
  <div class="form-group">
    <label class="form-label required" for="email">Email</label>
    <input
      type="email"
      id="email"
      class="form-control"
      placeholder="Enter your email"
      required
    />
    <span class="form-hint">We'll never share your email</span>
  </div>

  <div class="form-group">
    <label class="form-label required" for="password">Password</label>
    <input
      type="password"
      id="password"
      class="form-control"
      placeholder="Enter password"
      required
    />
  </div>

  <div class="form-group">
    <div class="form-check">
      <input type="checkbox" id="remember" class="form-check-input" />
      <label for="remember" class="form-check-label">Remember me</label>
    </div>
  </div>

  <button type="submit" class="btn btn-primary">Login</button>
  <button type="button" class="btn btn-secondary">Cancel</button>
</form>
```

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Considerations

1. **CSS Variables**: Used extensively for maintainability and theming
2. **Modular Architecture**: Separate files for better organization
3. **Mobile-First**: Smaller CSS files for mobile devices
4. **No Dependencies**: Pure CSS, no frameworks
5. **Optimized Selectors**: Efficient CSS selectors for better performance

---

## Maintenance

### Adding New Components

1. Add component styles to `assets/css/components.css`
2. Document the component in this file
3. Follow BEM naming convention
4. Ensure accessibility standards are met
5. Test across breakpoints

### Modifying Design Tokens

1. Update values in `assets/css/variables.css`
2. Test changes across all components
3. Update this documentation
4. Commit with descriptive message

---

## Version History

| Version | Date     | Changes                              | Author   |
| ------- | -------- | ------------------------------------ | -------- |
| 1.0.0   | Sprint 1 | Initial design system implementation | iamkk369 |

---

**Note**: This design system is the foundation for all future UI development. All components and pages must use these tokens and components to ensure consistency across the application.
