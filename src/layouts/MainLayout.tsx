import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Site Dashboard',
  '/people': 'Workers',
  '/attendance': 'Attendance',
  '/tasks': 'Site Tasks',
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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
