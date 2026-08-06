import { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { payroll } from '../data/payroll';

const months = ['2026-08', '2026-07'];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('2026-08');

  const filtered = payroll.filter(r => r.month === selectedMonth);
  const total = filtered.reduce((sum, r) => sum + r.netPay, 0);

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-500 font-medium">Month:</label>
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Base Salary</th>
              <th className="px-5 py-3 font-medium">Allowances</th>
              <th className="px-5 py-3 font-medium">Deductions</th>
              <th className="px-5 py-3 font-medium">Net Pay</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-900">{record.name}</td>
                <td className="px-5 py-3 text-gray-500">{record.department}</td>
                <td className="px-5 py-3 text-gray-600">{fmt(record.baseSalary)}</td>
                <td className="px-5 py-3 text-green-600">+{fmt(record.allowances)}</td>
                <td className="px-5 py-3 text-red-500">-{fmt(record.deductions)}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{fmt(record.netPay)}</td>
                <td className="px-5 py-3">
                  <Badge label={record.status === 'paid' ? 'Paid' : 'Pending'} variant={record.status === 'paid' ? 'green' : 'yellow'} />
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold border-t border-gray-200">
              <td colSpan={5} className="px-5 py-3 text-gray-700">Total Payroll</td>
              <td className="px-5 py-3 text-indigo-700">{fmt(total)}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
