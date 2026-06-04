# Tentwenty Timesheet Management Application

A modern, production-grade SaaS Timesheet Management Application.

🔗 **Live Demo:** [Insert Live URL Here]
🐙 **GitHub Repository:** [Insert GitHub Link Here]

## 🚀 Frameworks/Libraries Used

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 4
- **Authentication:** NextAuth.js 4
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged

## 📋 Prerequisites

- Node.js 20.x or higher
- npm (or yarn/pnpm)

## 🛠️ Setup Instructions

```bash
# 1. Clone repository
git clone <your-repo-url>
cd tentwenty-timesheet

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.local.example .env.local

# 4. Build the application
npm run build

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Test Credentials

Use the following test credentials to log in:

- **Email:** `admin@tentwenty.com` | **Password:** `admin123` -> (John Doe)
- **Email:** `user@tentwenty.com` | **Password:** `user123` -> (Test User)
- **Email:** `test@example.com` | **Password:** `test123` -> (Jane Smith)

## 🧪 Testing

```bash
# 1. Run all tests (once)
npm run test

# 2. Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# 3. Run tests with coverage report
npm run test:coverage

# 4. Open Vitest UI (visual test runner)
npm run test:ui
```

## 🧠 Assumptions & Notes

1. **Mock Database / API Storage:**
   - **Assumption:** Since no external database was required, the database layer is mocked using in-memory classes (`entryStore.ts` and `timesheetStore.ts`). These cleanly simulate CRUD operations and API delays, but state will reset upon server restart.
2. **Next-Auth Usage:**
   - **Assumption:** Authentication uses NextAuth with a mock `CredentialsProvider`. Validation is simulated via a mock user database. We assume the JWT strategy is preferred for stateless server-side validation on internal API routes.
3. **Hardcoded Business Data:**
   - Form dropdowns (Projects, Work Types) are extracted to `src/constants/timesheet.constants.ts`. We assume these are static for the scope of the assessment, though they are structured so they can easily be swapped for API endpoints later.
4. **Tailwind as the Single Source of Truth:**
   - All styling is handled purely by Tailwind utility classes to ensure a unified design system. We avoided inline `style={{...}}` blocks entirely to ensure responsive states (hover/focus/disabled) work cleanly across mobile and desktop devices.
5. **API Routing:**
   - All client-side data fetching happens through proper Next.js App Router internal API routes (`src/app/api/...`), ensuring server-side control and clean JSON responses.

## 📄 License
Private - For Assessment Purpose Only
