import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  title: string;
}

const profileMap = {
  admin: { name: 'Rajesh Kumar', role: 'Admin / Director' },
  manager: { name: 'Suresh Patel', role: 'Site Manager' },
};

export default function Navbar({ title }: NavbarProps) {
  const { auth } = useAuth();
  const isLabour = auth.role === 'labour';
  const displayName = isLabour ? (auth.employee?.name ?? 'Worker') : profileMap[auth.role as 'admin' | 'manager'].name;
  const displayRole = isLabour ? (auth.employee?.role ?? 'Labour') : profileMap[auth.role as 'admin' | 'manager'].role;
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
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
