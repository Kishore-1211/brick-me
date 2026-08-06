import { Users, CalendarCheck, CheckSquare, Banknote, Lock } from 'lucide-react';
import Card from '../components/ui/Card';
import AttendanceChart from '../components/charts/AttendanceChart';
import ProductivityChart from '../components/charts/ProductivityChart';
import DashboardCard from '../components/layout/DashboardCard';
import { dashboardStats, departmentStats } from '../data/reports';
import { useRole } from '../hooks/useRole';

export default function Reports() {
  const { isAdmin } = useRole();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Total Workers" value={dashboardStats.totalWorkers} icon={<Users size={20} className="text-indigo-600" />} change="Registered workers" color="bg-indigo-50" />
        <DashboardCard title="Active on Site" value={dashboardStats.activeWorkers} icon={<Users size={20} className="text-green-600" />} change="Currently deployed" color="bg-green-50" />
        <DashboardCard title="Attendance Rate" value={`${dashboardStats.attendanceRate}%`} icon={<CalendarCheck size={20} className="text-yellow-600" />} change="This week" color="bg-yellow-50" />

        {isAdmin ? (
          <DashboardCard title="Open Tasks" value={dashboardStats.openTasks} icon={<CheckSquare size={20} className="text-blue-600" />} change="Pending on site" color="bg-blue-50" />
        ) : (
          <DashboardCard title="Open Tasks" value={dashboardStats.openTasks} icon={<CheckSquare size={20} className="text-blue-600" />} change="Pending on site" color="bg-blue-50" />
        )}
      </div>

      {/* Admin-only financial summary */}
      {isAdmin ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide mb-1">Total Wages Due — August 2026</p>
            <p className="text-3xl font-bold text-indigo-700">₹{dashboardStats.wageDue.toLocaleString('en-IN')}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Banknote size={24} className="text-indigo-600" />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center gap-3 text-gray-400">
          <Lock size={18} />
          <div>
            <p className="text-sm font-medium">Financial Summary — Admin Only</p>
            <p className="text-xs">Wages and payroll data are restricted to Admin access.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Attendance Overview (Weekly)</h3>
          <AttendanceChart />
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Productivity Score (Monthly)</h3>
          <ProductivityChart />
        </Card>
      </div>

      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Department / Trade Breakdown</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Workers</th>
              <th className="px-5 py-3 font-medium">Avg Score</th>
              <th className="px-5 py-3 font-medium">Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {departmentStats.map(dept => (
              <tr key={dept.department} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-800">{dept.department}</td>
                <td className="px-5 py-3 text-gray-500">{dept.workers}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dept.avgScore}%` }} />
                    </div>
                    <span className="text-gray-600">{dept.avgScore}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500">{dept.attendance}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
