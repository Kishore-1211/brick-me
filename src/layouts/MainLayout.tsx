import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Site Dashboard',
  '/people': 'Workers',
  '/attendance': 'Attendance Management',
  '/tasks': 'Work Allocation',
  '/productivity': 'Productivity Approval',
  '/quality': 'Quality Inspection',
  '/performance': 'Performance',
  '/payroll': 'Wages & Payroll',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/check-in': 'Check In',
  '/my-attendance': 'My Attendance',
  '/my-tasks': 'My Tasks',
  '/my-payroll': 'My Wages',
};

export default function MainLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? 'Brickme';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
