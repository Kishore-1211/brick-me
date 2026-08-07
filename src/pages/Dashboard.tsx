import { Users, CalendarCheck, CheckSquare, Banknote, Lock } from 'lucide-react';
import DashboardCard from '../components/layout/DashboardCard';
import AttendanceChart from '../components/charts/AttendanceChart';
import ProductivityChart from '../components/charts/ProductivityChart';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { dashboardStats } from '../data/reports';
import { users } from '../data/users';
import { useRole } from '../hooks/useRole';
import { useLang } from '../context/LanguageContext';

export default function Dashboard() {
  const { isAdmin } = useRole();
  const { t } = useLang();
  const recentWorkers = users.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard
          title={t('totalWorkers')}
          value={dashboardStats.totalWorkers}
          icon={<Users size={20} className="text-indigo-600" />}
          change={`${dashboardStats.activeWorkers} ${t('active')}`}
          color="bg-indigo-50"
        />
        <DashboardCard
          title={t('attendanceRate')}
          value={`${dashboardStats.attendanceRate}%`}
          icon={<CalendarCheck size={20} className="text-green-600" />}
          change=""
          color="bg-green-50"
        />
        <DashboardCard
          title={t('openTasks')}
          value={dashboardStats.openTasks}
          icon={<CheckSquare size={20} className="text-yellow-600" />}
          change={t('pending')}
          color="bg-yellow-50"
        />
        {isAdmin ? (
          <DashboardCard
            title={t('wageDue')}
            value={`₹${(dashboardStats.wageDue / 1000).toFixed(0)}K`}
            icon={<Banknote size={20} className="text-blue-600" />}
            change="August 2026"
            color="bg-blue-50"
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-400">{t('wageDue')}</p>
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Lock size={16} className="text-gray-300" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-200 mb-1">₹ ••••</p>
            <p className="text-xs text-gray-300">{t('adminOnly')}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">{t('weeklyAttendanceChart')}</h3>
          <AttendanceChart />
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">{t('monthlyProductivity')}</h3>
          <ProductivityChart />
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">{t('activeWorkers')}</h3>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="pb-3 font-medium">{t('worker')}</th>
              <th className="pb-3 font-medium">{t('department')}</th>
              <th className="pb-3 font-medium">{t('role')}</th>
              <th className="pb-3 font-medium">{t('status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentWorkers.map(emp => (
              <tr key={emp.id}>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">{emp.avatar}</div>
                    <span className="font-medium text-gray-800">{emp.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500">{emp.department}</td>
                <td className="py-3 text-gray-500">{emp.role}</td>
                <td className="py-3">
                  <Badge label={emp.status === 'active' ? t('active') : t('inactive')} variant={emp.status === 'active' ? 'green' : 'gray'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}
