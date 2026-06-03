# Tentwenty Timesheet Management Application

A modern, production-grade SaaS Timesheet Management Application built with Next.js, TypeScript, and TailwindCSS.

## 🚀 Tech Stack

- **Framework:** Next.js 16.2.7 (App Router)
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 4
- **Authentication:** NextAuth.js 4
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged
- **CI/CD:** GitHub Actions

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn or pnpm
- Git

## 🛠️ Installation

```bash
# Clone repository
git clone <your-repo-url>
cd tentwenty-timesheet

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local

# Initialize Husky
npm run prepare

# Start development
npm run dev
```

## 🎯 Available Scripts

| Script                  | Description                  |
| ----------------------- | ---------------------------- |
| `npm run dev`           | Start development server     |
| `npm run build`         | Build production application |
| `npm start`             | Start production server      |
| `npm run lint`          | Run ESLint                   |
| `npm run lint:fix`      | Run ESLint with auto-fix     |
| `npm run format`        | Format with Prettier         |
| `npm run format:check`  | Check formatting             |
| `npm run test`          | Run tests                    |
| `npm run test:watch`    | Run tests in watch mode      |
| `npm run test:ui`       | Open Vitest UI               |
| `npm run test:coverage` | Generate coverage report     |

## 📁 Project Structure

```
tentwenty-timesheet/
├── .github/workflows/        # CI/CD pipelines
├── .husky/                   # Git hooks
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   ├── config/               # Configuration
│   ├── constants/            # Constants
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities
│   ├── providers/            # Context providers
│   ├── services/             # API services
│   ├── store/                # State management
│   ├── tests/                # Test files
│   └── types/                # TypeScript types
├── vitest.config.ts          # Vitest configuration
├── eslint.config.mjs         # ESLint configuration
└── package.json
```

## 🔧 Configuration

- **Testing:** Vitest with 80% coverage threshold
- **Linting:** ESLint + Prettier integration
- **Git Hooks:** Pre-commit (lint + format), Pre-push (tests)
- **CI/CD:** GitHub Actions for automated checks

## 📝 Development Status

🚧 **Work in Progress** - Initial project setup complete with production-grade folder structure and tooling configuration.

## 👥 Team

Developed for Tentwenty Frontend Assessment 2025

## 📄 License

Private - For Assessment Purpose Only
