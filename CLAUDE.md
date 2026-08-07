# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Brickme** — Construction site workforce management dashboard. Tracks workers (Mason, Carpenter, Electrician, Plumber, Welder, Foreman, etc.), their daily attendance, site tasks, wages/payroll, and performance. Three role-based logins: Admin (owner), Site Engineer, and Labour. The whole UI is available in 4 languages (English / Kannada / Tamil / Hindi).

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at localhost:5173
npm run build     # TypeScript check + production build
npm run preview   # Preview production build locally
```

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS (utility styling)
- Recharts (BarChart for attendance, LineChart for productivity)
- React Router v6
- Lucide React (icons)
- Static mock data only in `src/data/` — no API calls

## TypeScript Note

`verbatimModuleSyntax` is enabled. Always use `import type` for type-only imports (interfaces, type aliases from data files).

## Architecture

### Auth & Roles (`src/context/AuthContext.tsx`)
Three roles: `'admin' | 'engineer' | 'labour'`. Stored in `AuthContext` — no backend. Admin and Site Engineer are hardcoded profiles (Rajesh Kumar / Arjun Mehta); Labour selects their name from the workers dropdown and verifies a mock OTP on the login screen. (The old Site Manager role was removed — the Site Engineer replaces it.)

| Role | Nav | Landing |
|---|---|---|
| Admin (owner) | Full — Dashboard, Management Overview, Workers, Attendance, Work Allocation, Productivity Approval, Quality Inspection, Performance, Wages & Payroll, Reports, Settings | `/dashboard` |
| Site Engineer | Engineer Dashboard (Today's Site Status), Attendance, Work Allocation, Productivity Approval, Quality Inspection, Settings | `/engineer-dashboard` |
| Labour | Home, Check In, My Attendance, My Work, Upload Work, My Performance, Rewards, My Wages, Settings | `/labour-home` |

### Routing (`src/routes/AppRoutes.tsx`)
- `/login` — public
- All other routes nested under `<MainLayout>` (sidebar + navbar)
- Labour-specific routes: `/my-attendance`, `/my-tasks`, `/my-payroll`

### Layout (`src/layouts/MainLayout.tsx`)
Sidebar + Navbar + `<Outlet>`. Navbar title derived from a path→title map. Sidebar shows a role badge (amber for Admin, teal for Site Engineer, slate for Labour) and a Sign out button. On mobile the sidebar is a slide-in drawer toggled from the navbar.

### Mock Data (`src/data/`)
All static TypeScript arrays — no fetch calls.

| File | Contents |
|---|---|
| `users.ts` | 10 construction workers: Foreman, Mason, Carpenter, Electrician, Plumber, Welder, Safety Officer, Crane Operator, Helper, Store Keeper |
| `attendance.ts` | Daily records + `weeklyAttendance[]` for the bar chart |
| `tasks.ts` | 15 site tasks: foundation, wiring, scaffolding, brick masonry, welding, etc. |
| `payroll.ts` | Monthly wages per worker (Aug + Jul 2026) |
| `reports.ts` | `dashboardStats`, `productivityData[]`, `departmentStats[]`, `performanceData[]` |

Departments in use: Civil Works, Electrical, Plumbing, Safety & Compliance, Site Administration.

### Components
- `src/components/ui/` — `Button` (variant/size), `Card` (wrapper), `Badge` (color pill)
- `src/components/layout/` — `Sidebar` (role-aware nav), `Navbar` (dynamic user info), `DashboardCard` (stat metric)
- `src/components/charts/` — `AttendanceChart` (Recharts BarChart), `ProductivityChart` (Recharts LineChart)

### Design Tokens
Sidebar = `slate-900`, primary = `indigo-600`, page bg = `gray-50`, on-site/present = `green`, absent = `red`, late = `yellow`.
