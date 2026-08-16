# Student Reminder App

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

A production-ready, responsive web application designed to help college students manage assignments, examinations, lectures, practical sessions, personal tasks, and academic reminders through a clean, organized, and intuitive interface.

### 🎯 Project Goals

- Streamline academic task management for students
- Provide a centralized platform for all academic reminders
- Offer intuitive calendar and scheduling features
- Enable efficient time management and deadline tracking
- Build a scalable foundation for future feature expansion

### 📋 Key Features (Planned)

- **Assignment Management**: Track assignments with due dates, priority levels, and submission status
- **Examination Scheduler**: Countdown timers and comprehensive exam preparation tools
- **Academic Calendar**: Unified view of lectures, practicals, and personal tasks
- **Smart Reminders**: Customizable notification system for upcoming deadlines
- **Progress Tracking**: Visual analytics and completion statistics
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop devices
- **User Authentication**: Secure login and registration implemented (backend) ✅
- **Cloud Sync**: Cross-device synchronization (future)

---

## 🛠 Tech Stack

### Frontend

| Technology        | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| HTML5             | Semantic markup and page structure             |
| CSS3              | Styling, layout, and responsive design         |
| JavaScript (ES6+) | Interactive functionality and DOM manipulation |

### Future Backend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | Server-side runtime environment |
| Express.js | RESTful API framework           |
| MySQL      | Relational database management  |

### Development Tools

- **Version Control**: Git & GitHub
- **Editor**: Visual Studio Code
- **Methodology**: Agile (Scrum with sprints)

---

## 📁 Project Structure

```
Student-Reminder-App/
├── .gitignore                 # Git ignore configuration
├── LICENSE                    # MIT License
├── README.md                  # Project documentation
├── PROJECT_STRUCTURE.md       # Detailed structure guide
├── assets/                    # Static assets
│   ├── css/                   # Stylesheets
│   ├── js/                    # JavaScript files
│   ├── images/                # Image assets
│   ├── icons/                 # Icon files
│   └── fonts/                 # Custom fonts
├── components/                # Reusable UI components
├── pages/                     # Application pages/views
└── docs/                      # Project documentation
    ├── design-guidelines.md   # Design system
    └── coding-standards.md    # Coding conventions
```

For a detailed explanation of each folder and file, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Visual Studio Code (recommended)
- Git (for version control)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Student-Reminder-App.git
   cd Student-Reminder-App
   ```

2. **Open in Visual Studio Code**

   ```bash
   code .
   ```

3. **Development Setup**
   - Install the "Live Server" extension in VS Code
   - Right-click on any HTML file and select "Open with Live Server"
   - Or use any local development server of your choice

### Current Status

**Backend Foundation + Authentication (Phases A1-A3, B1-B3) ✅**

Backend phases completed:

- **Phase A1**: Express server foundation with `/api/health` endpoint
- **Phase A2**: MySQL connection layer with failure-safe startup
- **Phase A3**: Database foundation (`users` + `reminders` schema)
- **Phase B1**: Sessions table for secure session management ✅ (migration file restored on disk in P1 — see note below)
- **Phase B2**: User registration with bcrypt hashing and session creation
- **Phase B3**: Login endpoint with bcrypt authentication + session creation
- **Phase B4**: Auth middleware + /api/auth/me (session validation) ✅

Frontend remains prototype (Home + About pages complete).

Live MySQL integration testing is currently blocked — no MySQL server is available on this development machine. All authentication code is structurally validated and ready for database integration.

> **P1 note (Stability & Recovery Sprint):** `db/migrations/002_sessions_table.sql`
> was missing from disk and Git history in all branches despite being
> documented as complete. It has been re-created and statically validated
> (21/21 structure checks PASS) but has **not** been executed against a live
> MySQL server (no MySQL instance available) and is **not yet committed**.
> Live DB verification and Git history consistency are planned in P2/P3.

---

## 🗺️ Roadmap

| Phase | Focus Area         | Deliverables                                          |
| ------ | -------------------- | ----------------------------------------------------- |
| **A1** | Backend Foundation | Express server, `/api/health`, middleware            |
| **A2** | MySQL Connection    | Connection pool, health check                         |
| **A3** | Database Schema     | `users` + `reminders` tables                          |
| **B1** | Sessions Table      | Secure session storage (SHA-256 hashed IDs)           |
| **B2** | Registration        | User registration + bcrypt + session creation         |
| **B3** | Login               | Authentication + session creation                     |
| **B4** | Auth Middleware     | Token validation + `/api/auth/me` ✅                        |
| **B5** | Logout              | Session invalidation                                 |
| **C**  | Dashboard           | Authenticated app shell                               |
| **D**  | Reminder CRUD       | Create, edit, delete reminders                        |

---

## 🎨 Design System

This project follows a comprehensive design system for consistency and professionalism:

- **Color Palette**: Primary, secondary, neutral, and semantic colors
- **Typography**: System font stack with defined scale
- **Components**: Button styles, cards, forms, and modals
- **Spacing**: 4-point grid system for consistent layouts
- **Responsive**: Mobile-first approach with defined breakpoints
- **Accessibility**: WCAG 2.1 compliant focus states and contrast ratios

See [docs/design-guidelines.md](docs/design-guidelines.md) for complete details.

---

## 📝 Coding Standards

All code in this project follows strict conventions:

- **HTML**: Semantic HTML5 with proper accessibility attributes
- **CSS**: BEM (Block Element Modifier) naming methodology
- **JavaScript**: ES6+ with modular architecture
- **Git**: Conventional Commits specification

See [docs/coding-standards.md](docs/coding-standards.md) for complete guidelines.

---

## 🤝 Contributing

This is a portfolio project. Contributions, suggestions, and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions, feedback, or collaboration opportunities, please open an issue on GitHub.

---

## ⭐ Support

If you find this project interesting or useful, please consider giving it a star on GitHub. Your support helps others discover the project!

---

**Built with ❤️ as a portfolio project demonstrating professional web development practices, scalable architecture, and industry-standard documentation.**

_Last Updated: Sprint 3B Phase 3 — About Page — COMPLETE | Phase B4 — Auth Middleware + /api/auth/me — COMPLETE_
