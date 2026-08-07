import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarCheck, CheckSquare,
  TrendingUp, Banknote, BarChart2, Settings, LogOut, ShieldCheck, ScanFace,
  Award, ClipboardCheck, X, Home, Briefcase, Upload, Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import Logo from '../ui/Logo';
import type { TranslationKey } from '../../i18n/translations';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const siteNav: { icon: typeof Home; labelKey: TranslationKey; path: string }[] = [
  { icon: LayoutDashboard, labelKey: 'navDashboard', path: '/dashboard' },
  { icon: Building2, labelKey: 'managementOverview', path: '/overview' },
  { icon: Users, labelKey: 'navWorkers', path: '/people' },
  { icon: CalendarCheck, labelKey: 'navAttendance', path: '/attendance' },
  { icon: CheckSquare, labelKey: 'navWorkAllocation', path: '/tasks' },
  { icon: Award, labelKey: 'navProductivity', path: '/productivity' },
  { icon: ClipboardCheck, labelKey: 'navQuality', path: '/quality' },
  { icon: TrendingUp, labelKey: 'navPerformance', path: '/performance' },
  { icon: Banknote, labelKey: 'navWages', path: '/payroll' },
  { icon: BarChart2, labelKey: 'navReports', path: '/reports' },
  { icon: Settings, labelKey: 'navSettings', path: '/settings' },
];

const engineerNav: { icon: typeof Home; labelKey: TranslationKey; path: string }[] = [
  { icon: LayoutDashboard, labelKey: 'navDashboard', path: '/engineer-dashboard' },
  { icon: CalendarCheck, labelKey: 'navAttendance', path: '/attendance' },
  { icon: CheckSquare, labelKey: 'navWorkAllocation', path: '/tasks' },
  { icon: Award, labelKey: 'navProductivity', path: '/productivity' },
  { icon: ClipboardCheck, labelKey: 'navQuality', path: '/quality' },
  { icon: Settings, labelKey: 'navSettings', path: '/settings' },
];

const labourNav: { icon: typeof Home; labelKey: TranslationKey; path: string }[] = [
  { icon: Home, labelKey: 'navHome', path: '/labour-home' },
  { icon: ScanFace, labelKey: 'navCheckIn', path: '/check-in' },
  { icon: CalendarCheck, labelKey: 'navMyAttendance', path: '/my-attendance' },
  { icon: Briefcase, labelKey: 'navMyWork', path: '/my-work' },
  { icon: Upload, labelKey: 'navUploadWork', path: '/work-upload' },
  { icon: TrendingUp, labelKey: 'navMyPerformance', path: '/my-performance' },
  { icon: Award, labelKey: 'navRewards', path: '/rewards' },
  { icon: Banknote, labelKey: 'navMyWages', path: '/my-payroll' },
  { icon: Settings, labelKey: 'navSettings', path: '/settings' },
];

const profileMap = {
  admin: { name: 'Rajesh Kumar' },
  engineer: { name: 'Arjun Mehta' },
};

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { auth, logout } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const isLabour = auth.role === 'labour';
  const isEngineer = auth.role === 'engineer';
  const navItems = isLabour ? labourNav : isEngineer ? engineerNav : siteNav;

  const displayName = isLabour ? (auth.employee?.name ?? 'Worker') : profileMap[auth.role as 'admin' | 'engineer'].name;
  const displayRole = isLabour
    ? (auth.employee?.role ?? t('labour'))
    : auth.role === 'admin' ? t('adminDirector')
    : t('engineer');
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`w-64 bg-slate-900 flex flex-col h-screen flex-shrink-0 z-40 transition-transform duration-200
          fixed inset-y-0 left-0 md:static md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-700">
          <Logo size={36} className="flex-shrink-0" />
          <div>
            <span className="font-bold text-base tracking-tight">
              <span className="text-white">Brick</span><span className="text-[#E8836F]">me</span>
            </span>
            <p className="text-slate-400 text-[10px] leading-none mt-0.5">{t('taglineShort')}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-slate-400 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

      {/* Role badge */}
      <div className="px-4 pt-3 pb-1">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          auth.role === 'admin' ? 'bg-amber-500/20 text-amber-400' :
          auth.role === 'engineer' ? 'bg-teal-500/20 text-teal-300' :
          'bg-slate-700 text-slate-300'
        }`}>
          <ShieldCheck size={11} />
          {auth.role === 'admin' ? t('admin') : auth.role === 'engineer' ? t('engineer') : t('labour')}
        </span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, labelKey, path }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon size={17} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-700 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{initials}</div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{displayName}</p>
            <p className="text-slate-400 text-xs truncate">{displayRole}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition-colors"
        >
          <LogOut size={15} />
          {t('signOut')}
        </button>
      </div>
    </aside>
    </>
  );
}
