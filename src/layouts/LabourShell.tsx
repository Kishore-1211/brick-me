import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ScanFace, Briefcase, Home, TrendingUp, Banknote, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import Logo from '../components/ui/Logo';
import type { TranslationKey } from '../i18n/translations';

interface SubPage { path: string; labelKey: TranslationKey }
interface Section { key: string; icon: typeof Home; labelKey: TranslationKey; pages: SubPage[]; center?: boolean }

// Bottom-tab order: Check In · My Work · Home (center) · My Performance · Wages.
// Some tabs hold a second page reachable via the segmented sub-nav.
const sections: Section[] = [
  { key: 'checkin', icon: ScanFace, labelKey: 'navCheckIn', pages: [
    { path: '/check-in', labelKey: 'navCheckIn' },
    { path: '/my-attendance', labelKey: 'navMyAttendance' },
  ] },
  { key: 'work', icon: Briefcase, labelKey: 'navMyWork', pages: [
    { path: '/my-work', labelKey: 'navMyWork' },
    { path: '/work-upload', labelKey: 'navUploadWork' },
  ] },
  { key: 'home', icon: Home, labelKey: 'navHome', center: true, pages: [
    { path: '/labour-home', labelKey: 'navHome' },
  ] },
  { key: 'perf', icon: TrendingUp, labelKey: 'navMyPerformance', pages: [
    { path: '/my-performance', labelKey: 'navMyPerformance' },
    { path: '/rewards', labelKey: 'navRewards' },
  ] },
  { key: 'wages', icon: Banknote, labelKey: 'navMyWages', pages: [
    { path: '/my-payroll', labelKey: 'navMyWages' },
  ] },
];

export default function LabourShell() {
  const { auth } = useAuth();
  const { t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  const worker = auth.employee;
  const initials = worker?.avatar ?? 'W';
  const activeSection = sections.find(s => s.pages.some(p => p.path === location.pathname));

  return (
    <div className="h-screen w-full flex justify-center bg-gray-100">
      <div className="relative w-full max-w-md h-screen flex flex-col bg-gray-50 overflow-hidden shadow-xl">
        {/* Top bar: brand left, profile + settings right */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Logo size={30} />
            <span className="font-bold text-base tracking-tight">
              <span className="text-gray-900">Brick</span><span className="text-[#C0392B]">me</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 pl-1"
              aria-label={worker?.name}
            >
              <div className="text-right leading-tight">
                <p className="text-xs font-semibold text-gray-800 max-w-[90px] truncate">{worker?.name ?? 'Worker'}</p>
                <p className="text-[10px] text-gray-400 max-w-[90px] truncate">{worker?.role ?? t('labour')}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
              aria-label={t('navSettings')}
            >
              <Settings size={19} />
            </button>
          </div>
        </header>

        {/* Segmented sub-nav for tabs that hold two pages */}
        {activeSection && activeSection.pages.length > 1 && (
          <div className="flex gap-1.5 px-4 py-2 bg-white border-b border-gray-100 flex-shrink-0">
            {activeSection.pages.map(p => (
              <NavLink
                key={p.path}
                to={p.path}
                className={({ isActive }) =>
                  `flex-1 text-center text-xs font-medium py-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`
                }
              >
                {t(p.labelKey)}
              </NavLink>
            ))}
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <Outlet />
        </main>

        {/* Bottom tab bar */}
        <nav className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 flex items-end justify-around px-2 pt-1.5 pb-2">
          {sections.map(s => {
            const isActive = activeSection?.key === s.key;
            const Icon = s.icon;
            if (s.center) {
              return (
                <button
                  key={s.key}
                  onClick={() => navigate(s.pages[0].path)}
                  className="flex flex-col items-center gap-1 -mt-6"
                >
                  <span className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 ${
                    isActive ? 'bg-indigo-600' : 'bg-indigo-600'
                  }`}>
                    <Icon size={24} className="text-white" />
                  </span>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>{t(s.labelKey)}</span>
                </button>
              );
            }
            return (
              <button
                key={s.key}
                onClick={() => navigate(s.pages[0].path)}
                className="flex flex-col items-center gap-1 flex-1 py-1"
              >
                <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>{t(s.labelKey)}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
