import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarCheck, CheckSquare,
  TrendingUp, Banknote, BarChart2, Settings, Layers, LogOut, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const siteNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Workers', path: '/people' },
  { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
  { icon: CheckSquare, label: 'Site Tasks', path: '/tasks' },
  { icon: TrendingUp, label: 'Performance', path: '/performance' },
  { icon: Banknote, label: 'Wages & Payroll', path: '/payroll' },
  { icon: BarChart2, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const labourNav = [
  { icon: CalendarCheck, label: 'My Attendance', path: '/my-attendance' },
  { icon: CheckSquare, label: 'My Tasks', path: '/my-tasks' },
  { icon: Banknote, label: 'My Wages', path: '/my-payroll' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const profileMap = {
  admin: { name: 'Rajesh Kumar', role: 'Admin / Director', email: 'admin@brickme.io' },
  manager: { name: 'Suresh Patel', role: 'Site Manager', email: 'manager@brickme.io' },
};

export default function Sidebar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const isLabour = auth.role === 'labour';
  const navItems = isLabour ? labourNav : siteNav;

  const displayName = isLabour ? (auth.employee?.name ?? 'Worker') : profileMap[auth.role as 'admin' | 'manager'].name;
  const displayRole = isLabour ? (auth.employee?.role ?? 'Labour') : profileMap[auth.role as 'admin' | 'manager'].role;
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="w-64 bg-slate-900 flex flex-col h-screen flex-shrink-0">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-700">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Layers size={18} className="text-white" />
        </div>
        <div>
          <span className="text-white font-bold text-base tracking-tight">Brickme</span>
          <p className="text-slate-400 text-[10px] leading-none mt-0.5">Construction Site Mgmt</p>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-4 pt-3 pb-1">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          auth.role === 'admin' ? 'bg-amber-500/20 text-amber-400' :
          auth.role === 'manager' ? 'bg-indigo-500/20 text-indigo-300' :
          'bg-slate-700 text-slate-300'
        }`}>
          <ShieldCheck size={11} />
          {auth.role === 'admin' ? 'Admin' : auth.role === 'manager' ? 'Site Manager' : 'Labour'}
        </span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon size={17} />
            {label}
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
          Sign out
        </button>
      </div>
    </aside>
  );
}
