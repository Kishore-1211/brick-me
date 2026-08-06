import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { payroll } from '../data/payroll';

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function MyPayroll() {
  const { auth } = useAuth();
  const myPayroll = payroll.filter(r => r.employeeId === auth.employee?.id);

  return (
    <div className="space-y-4">
      {myPayroll.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600 font-medium">Latest Net Wages</p>
            <p className="text-3xl font-bold text-indigo-700">{fmt(myPayroll[0].netPay)}</p>
            <p className="text-xs text-indigo-400 mt-1">{myPayroll[0].month}</p>
          </div>
          <Badge label={myPayroll[0].status === 'paid' ? 'Paid' : 'Pending'} variant={myPayroll[0].status === 'paid' ? 'green' : 'yellow'} />
        </div>
      )}

      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Wages History</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Month</th>
              <th className="px-5 py-3 font-medium">Base Salary</th>
              <th className="px-5 py-3 font-medium">Allowances</th>
              <th className="px-5 py-3 font-medium">Deductions</th>
              <th className="px-5 py-3 font-medium">Net Pay</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {myPayroll.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-700">{record.month}</td>
                <td className="px-5 py-3 text-gray-600">{fmt(record.baseSalary)}</td>
                <td className="px-5 py-3 text-green-600">+{fmt(record.allowances)}</td>
                <td className="px-5 py-3 text-red-500">-{fmt(record.deductions)}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{fmt(record.netPay)}</td>
                <td className="px-5 py-3">
                  <Badge label={record.status === 'paid' ? 'Paid' : 'Pending'} variant={record.status === 'paid' ? 'green' : 'yellow'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myPayroll.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No payroll records found.</p>
        )}
      </Card>
    </div>
  );
}
