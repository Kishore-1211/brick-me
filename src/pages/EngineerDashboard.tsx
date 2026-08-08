import { Link } from 'react-router-dom';
import { Users, TrendingUp, ShieldCheck, ClipboardList, CalendarCheck, CheckSquare, Award, ClipboardCheck, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import { useLang } from '../context/LanguageContext';
import { attendance } from '../data/attendance';
import { productivitySubmissions } from '../data/productivity';
import { users } from '../data/users';

const CURRENT_DATE = '2026-08-05';
const PRODUCTIVITY = 87;
const QUALITY = 92;

export default function EngineerDashboard() {
  const { t } = useLang();

  const todayRecords = attendance.filter(r => r.date === CURRENT_DATE);
  const presentToday = todayRecords.filter(r => r.status === 'present' || r.status === 'late').length;
  const totalToday = todayRecords.length || users.filter(u => u.status === 'active').length;

  const pendingAttendance = attendance.filter(r => r.approval === 'pending').length;
  const pendingProductivity = productivitySubmissions.filter(s => s.status === 'pending').length;
  const pendingApprovals = pendingAttendance + pendingProductivity;

  const stats = [
    { label: t('workersPresent'), value: `${presentToday}/${totalToday}`, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: t('productivityScore'), value: `${PRODUCTIVITY}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: t('qualityScore'), value: `${QUALITY}%`, icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('pendingApprovals'), value: `${pendingApprovals}`, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const shortcuts = [
    { labelKey: 'titleAttendanceMgmt', path: '/attendance', icon: CalendarCheck },
    { labelKey: 'navWorkAllocation', path: '/tasks', icon: CheckSquare },
    { labelKey: 'navProductivity', path: '/productivity', icon: Award },
    { labelKey: 'navQuality', path: '/quality', icon: ClipboardCheck },
  ] as const;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">{t('todaySiteStatus')}</h2>

      {/* Today's Site Status */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={20} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold stat-number">{value}</p>
          </Card>
        ))}
      </div>

      {/* Quick access to engineer screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shortcuts.map(({ labelKey, path, icon: Icon }) => (
          <Link key={path} to={path}>
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Icon size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{t(labelKey)}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
