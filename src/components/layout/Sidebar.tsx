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
        className={`w-64 bg-[#321E48] flex flex-col h-screen flex-shrink-0 z-40 transition-transform duration-200
          fixed inset-y-0 left-0 md:static md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <Logo size={36} className="flex-shrink-0" />
          <div>
            <span className="font-bold text-base tracking-tight">
              <span className="text-white">Brick</span><span className="text-[#65DCD5]">me</span>
            </span>
            <p className="text-[#D9FFF4]/60 text-[10px] leading-none mt-0.5">{t('taglineShort')}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-white/70 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

      {/* Role badge */}
      <div className="px-4 pt-3 pb-1">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          auth.role === 'admin' ? 'bg-teal-400/20 text-teal-300' :
          auth.role === 'engineer' ? 'bg-steel-400/25 text-steel-200' :
          'bg-white/15 text-white/80'
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
                  ? 'bg-teal-400 text-[#20132E] shadow-sm'
                  : 'text-[#D9FFF4]/85 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Icon size={17} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-[#20132E] text-xs font-bold flex-shrink-0">{initials}</div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{displayName}</p>
            <p className="text-white/60 text-xs truncate">{displayRole}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-sm transition-colors"
        >
          <LogOut size={15} />
          {t('signOut')}
        </button>
      </div>
    </aside>
    </>
  );
}
