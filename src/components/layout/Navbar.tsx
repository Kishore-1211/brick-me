import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

interface NavbarProps {
  title: string;
  onMenuClick: () => void;
}

const profileMap = {
  admin: { name: 'Rajesh Kumar' },
  engineer: { name: 'Arjun Mehta' },
};

export default function Navbar({ title, onMenuClick }: NavbarProps) {
  const { auth } = useAuth();
  const { t } = useLang();
  const isLabour = auth.role === 'labour';
  const displayName = isLabour ? (auth.employee?.name ?? 'Worker') : profileMap[auth.role as 'admin' | 'engineer'].name;
  const displayRole = isLabour
    ? (auth.employee?.role ?? t('labour'))
    : auth.role === 'admin' ? t('adminDirector')
    : t('engineer');
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-700 transition-colors md:hidden flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base font-semibold text-gray-900 truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        {!isLabour && (
          <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
            <Bell size={19} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
          <div>
            <p className="text-sm font-medium text-gray-700 leading-tight">{displayName}</p>
            <p className="text-xs text-gray-400 leading-tight">{displayRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
