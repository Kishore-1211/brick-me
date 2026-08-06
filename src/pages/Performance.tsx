import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../components/ui/Card';
import ProductivityChart from '../components/charts/ProductivityChart';
import { performanceData } from '../data/reports';

export default function Performance() {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Productivity Trend (Monthly)</h3>
        <ProductivityChart />
      </Card>

      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Employee Performance Rankings</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Rank</th>
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {performanceData.map(emp => (
              <tr key={emp.employeeId} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {emp.rank}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-gray-900">{emp.name}</td>
                <td className="px-5 py-3 text-gray-500">{emp.department}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${emp.score}%` }} />
                    </div>
                    <span className="text-gray-700 font-medium">{emp.score}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  {emp.trend === 'up'
                    ? <TrendingUp size={16} className="text-green-500" />
                    : <TrendingDown size={16} className="text-red-500" />
                  }
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
