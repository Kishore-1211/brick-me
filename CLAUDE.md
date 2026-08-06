# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Brickme** — Construction site workforce management dashboard. Tracks workers (Mason, Carpenter, Electrician, Plumber, Welder, Foreman, etc.), their daily attendance, site tasks, wages/payroll, and performance. Three role-based logins: Admin, Site Manager, and Labour.

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
Three roles: `'admin' | 'manager' | 'labour'`. Stored in `AuthContext` — no backend. Admin and Manager are hardcoded profiles (Rajesh Kumar / Suresh Patel); Labour selects their name from the workers dropdown on the login screen.

| Role | Nav | Landing |
|---|---|---|
| Admin | Full — Site Dashboard, Workers, Attendance, Site Tasks, Performance, Wages & Payroll, Reports, Settings | `/dashboard` |
| Site Manager | Same full nav | `/dashboard` |
| Labour | My Attendance, My Tasks, My Wages, Settings | `/my-attendance` |

### Routing (`src/routes/AppRoutes.tsx`)
- `/login` — public
- All other routes nested under `<MainLayout>` (sidebar + navbar)
- Labour-specific routes: `/my-attendance`, `/my-tasks`, `/my-payroll`

### Layout (`src/layouts/MainLayout.tsx`)
Sidebar + Navbar + `<Outlet>`. Navbar title derived from a path→title map. Sidebar shows a role badge (amber for Admin, indigo for Manager, slate for Labour) and a Sign out button.

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
