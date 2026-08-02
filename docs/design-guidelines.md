# Design Guidelines

> **Version**: 1.0.0  
> **Last Updated**: Sprint 0 - Project Foundation  
> **Status**: Active

This document outlines the comprehensive design system for the Student Reminder App. It ensures visual consistency across the application and provides a reference for all UI components and design decisions.

## Color Palette

### Primary Brand Colors

| Color Name    | Hex Code  | Usage                                 |
| ------------- | --------- | ------------------------------------- |
| Primary Blue  | `#2563EB` | Primary buttons, links, active states |
| Primary Dark  | `#1E40AF` | Hover states for primary elements     |
| Primary Light | `#DBEAFE` | Backgrounds, subtle highlights        |

### Secondary Brand Colors

| Color Name       | Hex Code  | Usage                               |
| ---------------- | --------- | ----------------------------------- |
| Secondary Purple | `#7C3AED` | Secondary actions, accents          |
| Secondary Dark   | `#6D28D9` | Hover states for secondary elements |
| Secondary Light  | `#EDE9FE` | Backgrounds, subtle highlights      |

### Neutral Colors (Grayscale)

| Color Name | Hex Code  | Usage                           |
| ---------- | --------- | ------------------------------- |
| Gray 900   | `#111827` | Primary text, headings          |
| Gray 700   | `#374151` | Secondary text, body content    |
| Gray 500   | `#6B7280` | Tertiary text, placeholders     |
| Gray 300   | `#D1D5DB` | Borders, dividers               |
| Gray 100   | `#F3F4F6` | Light backgrounds               |
| Gray 50    | `#F9FAFB` | Page backgrounds                |
| White      | `#FFFFFF` | Card backgrounds, content areas |

### Semantic Colors (Status & Feedback)

| Color Name    | Hex Code  | Usage                                      |
| ------------- | --------- | ------------------------------------------ |
| Success Green | `#10B981` | Success messages, completed tasks          |
| Warning Amber | `#F59E0B` | Warnings, pending items                    |
| Error Red     | `#EF4444` | Errors, overdue items, destructive actions |
| Info Cyan     | `#06B6D4` | Informational messages, tips               |

## Typography

### Font Family

- **Primary Font**: System font stack for optimal performance
  ```css
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  ```
- **Monospace Font**: For code snippets and data displays
  ```css
  font-family:
    "SF Mono", Monaco, Inconsolata, "Fira Code", "Fira Mono", monospace;
  ```

### Font Sizes

| Element    | Size            | Line Height | Weight |
| ---------- | --------------- | ----------- | ------ |
| H1         | 2.5rem (40px)   | 1.2         | 700    |
| H2         | 2rem (32px)     | 1.3         | 700    |
| H3         | 1.75rem (28px)  | 1.4         | 600    |
| H4         | 1.5rem (24px)   | 1.4         | 600    |
| H5         | 1.25rem (20px)  | 1.5         | 600    |
| H6         | 1rem (16px)     | 1.5         | 600    |
| Body Large | 1.125rem (18px) | 1.6         | 400    |
| Body       | 1rem (16px)     | 1.6         | 400    |
| Body Small | 0.875rem (14px) | 1.5         | 400    |
| Caption    | 0.75rem (12px)  | 1.4         | 400    |

## Button Styles

### Primary Button

```css
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #1e40af;
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
```

### Secondary Button

```css
.btn-secondary {
  background-color: transparent;
  color: #2563eb;
  padding: 0.75rem 1.5rem;
  border: 1px solid #2563eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: #dbeafe;
}
```

### Button Sizes

- **Small**: 0.5rem 1rem, font-size: 0.875rem
- **Medium**: 0.75rem 1.5rem, font-size: 1rem (default)
- **Large**: 1rem 2rem, font-size: 1.125rem

## Card Styles

```css
.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.card:hover {
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}
```

### Card Variants

- **Default Card**: White background with subtle shadow
- **Interactive Card**: Includes hover effect with elevation change
- **Flat Card**: No shadow, only border
- **Highlighted Card**: Light primary background for emphasis

## Border Radius

| Element | Radius         | Usage                           |
| ------- | -------------- | ------------------------------- |
| Small   | 0.25rem (4px)  | Inputs, small badges            |
| Medium  | 0.5rem (8px)   | Buttons, form elements          |
| Large   | 0.75rem (12px) | Cards, modals                   |
| XL      | 1rem (16px)    | Hero sections, large containers |
| Full    | 9999px         | Circular elements, pills        |

## Shadows

| Shadow Name | CSS Value                                                         | Usage            |
| ----------- | ----------------------------------------------------------------- | ---------------- |
| SM          | `0 1px 2px rgba(0, 0, 0, 0.05)`                                   | Subtle elements  |
| DEFAULT     | `0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)`     | Cards, dropdowns |
| MD          | `0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)`    | Elevated cards   |
| LG          | `0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)`   | Modals, popovers |
| XL          | `0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)` | Major overlays   |

## Spacing System

Use a consistent 4-point grid system:

| Token    | Value          | Usage                           |
| -------- | -------------- | ------------------------------- |
| space-1  | 0.25rem (4px)  | Tight spacing within components |
| space-2  | 0.5rem (8px)   | Small gaps, icon padding        |
| space-3  | 0.75rem (12px) | Medium gaps, form spacing       |
| space-4  | 1rem (16px)    | Default spacing, card padding   |
| space-5  | 1.25rem (20px) | Large gaps                      |
| space-6  | 1.5rem (24px)  | Section spacing                 |
| space-8  | 2rem (32px)    | Major section spacing           |
| space-10 | 2.5rem (40px)  | Large container padding         |
| space-12 | 3rem (48px)    | Extra large spacing             |
| space-16 | 4rem (64px)    | Maximum spacing                 |

## Responsive Breakpoints

| Breakpoint | Min Width | Max Width | Target Devices |
| ---------- | --------- | --------- | -------------- |
| sm         | 640px     | 767px     | Large phones   |
| md         | 768px     | 1023px    | Tablets        |
| lg         | 1024px    | 1279px    | Small desktops |
| xl         | 1280px    | 1535px    | Desktops       |
| 2xl        | 1536px    | -         | Large desktops |

### Mobile-First Approach

```css
/* Mobile (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
    max-width: 1280px;
    margin: 0 auto;
  }
}
```

## Additional Guidelines

### Focus States

All interactive elements must have visible focus indicators for accessibility:

```css
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

### Transitions

Use consistent transition durations:

- **Fast**: 150ms (hover states, small interactions)
- **Normal**: 200ms (most interactions)
- **Slow**: 300ms (page transitions, modals)

### Z-Index Scale

| Layer          | Z-Index | Usage           |
| -------------- | ------- | --------------- |
| Base           | 0       | Default content |
| Dropdown       | 100     | Dropdown menus  |
| Sticky         | 200     | Sticky headers  |
| Modal Backdrop | 300     | Modal overlays  |
| Modal          | 400     | Modal dialogs   |
| Tooltip        | 500     | Tooltips        |
| Toast          | 600     | Notifications   |

## Accessibility

- Maintain minimum color contrast ratio of 4.5:1 for normal text
- Minimum touch target size: 44x44px
- Support keyboard navigation
- Provide text alternatives for non-text content
- Use semantic HTML elements

---

## Implementation Notes

- All color values should be defined as CSS custom properties (variables) in `:root`
- Use semantic color names in CSS (e.g., `var(--color-success)`) rather than hardcoded values
- Ensure all color combinations meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text)
- Test color schemes in both light and dark modes (future)

## Resources

- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors) - Reference for color naming
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verify accessibility
- [Coolors](https://coolors.co/) - Color scheme generator

---

**Note**: These guidelines should be followed strictly to maintain a cohesive and professional user experience across the application.
