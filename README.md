# GigMatch - Freelance Job Matching Platform

A React + TypeScript based Freelance Job Matching Platform designed as a modern web application. This version features a clean separation of frontend and backend concerns with organized branching strategy.

## Project Overview

This platform manages:

**Freelancer Profiles** - Comprehensive skill-based profiles with portfolio showcase
**Job Postings & Applications** - Smart job matching and application tracking
**Project Management** - End-to-end project lifecycle from posting to completion
**User Authentication** - Secure login/signup with role-based access
**Dashboard Analytics** - Performance metrics and insights for all users
**Real-time Notifications** - Instant updates on applications and messages
**Responsive Design** - Web-first approach with modern UI/UX

Built using:

**React 18** — Modern frontend framework with hooks
**TypeScript** — Type-safe JavaScript development
**Vite** — Fast build tool and development server
**CSS Modules** — Scoped component styling
**Git** — Version control with structured branching

## Folder Structure

```
GigMatch/
│
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx     # Main application layout
│   │   ├── ApplicationStatusPanel.jsx
│   │   └── NotificationPanel.jsx
│   ├── pages/             # Page components
│   │   ├── Login.jsx      # Authentication pages
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Discover.jsx   # Job discovery
│   │   ├── Profile.jsx    # User profiles
│   │   └── Settings.jsx   # User settings
│   ├── context/           # React context providers
│   │   └── AppContext.jsx # Global application state
│   ├── data/              # Mock data and constants
│   │   └── mockData.js
│   ├── assets/            # Static assets (images, icons)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   └── utils/             # Utility functions
│
├── public/                # Public assets
├── dist/                  # Production build output
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Setup Instructions

### 1. Install Requirements
```bash
# Install Node.js dependencies
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=GigMatch
```

### 3. Start Development Server
```bash
# Start the development server
npm run dev
```

### 4. Access Application
Visit: **🔗 http://localhost:5173**

## Default User Accounts

| Role | Credentials | Dashboard Access |
|------|-------------|------------------|
| **Freelancer** | john.doe@email.com / freelancer123 | `/dashboard/freelancer` |
| **Business** | acme.corp@email.com / business123 | `/dashboard/business` |

## Application Features

- **Smart Job Matching** - AI-powered recommendations based on skills and preferences
- **Real-time Notifications** - Instant updates via notification panel
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Component Architecture** - Modular, reusable React components
- **Type Safety** - Full TypeScript integration for better development experience
- **Modern Build Tools** - Vite for fast development and optimized production builds

## Future Upgrades (Backend Integration)

A future version will introduce:

**Backend API Integration** (Node.js/Express + MongoDB)
**Real Database** instead of mock data
**JWT Authentication** with secure token management
**RESTful API** for all platform operations
**Advanced Analytics** with data visualization
**Admin Panel** for platform management

### Switch to Backend-Integrated Version
When ready for full-stack development:
```bash
git checkout feature/backend-api
```

## Credits

**Author:** Team AITHENA
**Frontend:** React 18 + TypeScript
**Build Tool:** Vite 4.4+
**Styling:** CSS Modules
**License:** Open Source / Educational Use

## Branch Strategy

Your repository uses a structured branching approach:

- **`main`** - Production-ready code
- **`develop`** - Staging area for all features
- **`feature/frontend`** - UI components and styling
- **`feature/backend`** - Business logic and services

### When you switch branches:
- **`feature/frontend`** - Contains only UI components, pages, and styles
- **`feature/backend`** - Contains services, hooks, utilities, and business logic
- **`develop`** - Contains all features combined
- **`main`** - Contains stable, tested production code

---

**Made with love by Team AITHENA**