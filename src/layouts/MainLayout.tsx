import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import LabourShell from './LabourShell';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import type { TranslationKey } from '../i18n/translations';

const pageTitleKeys: Record<string, TranslationKey> = {
  '/dashboard': 'titleSiteDashboard',
  '/engineer-dashboard': 'todaySiteStatus',
  '/overview': 'managementOverview',
  '/people': 'navWorkers',
  '/attendance': 'titleAttendanceMgmt',
  '/tasks': 'navWorkAllocation',
  '/productivity': 'navProductivity',
  '/quality': 'navQuality',
  '/performance': 'navPerformance',
  '/payroll': 'navWages',
  '/reports': 'navReports',
  '/settings': 'navSettings',
  '/labour-home': 'navHome',
  '/check-in': 'navCheckIn',
  '/my-attendance': 'navMyAttendance',
  '/my-work': 'myAssignedWork',
  '/work-upload': 'workCompletion',
  '/my-performance': 'myPerformance',
  '/rewards': 'rewards',
  '/my-payroll': 'navMyWages',
};

export default function MainLayout() {
  const location = useLocation();
  const { t } = useLang();
  const { auth } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Labour gets a dedicated mobile-app shell (top profile bar + bottom tab bar).
  if (auth.role === 'labour') return <LabourShell />;

  const key = pageTitleKeys[location.pathname];
  const title = key ? t(key) : t('appName');

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
