import { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { attendance } from '../data/attendance';
import type { AttendanceStatus } from '../data/attendance';

const statusConfig: Record<AttendanceStatus, { label: string; variant: 'green' | 'red' | 'yellow' | 'blue' | 'gray'; rowClass: string }> = {
  present: { label: 'Present', variant: 'green', rowClass: '' },
  absent: { label: 'Absent', variant: 'red', rowClass: 'bg-red-50' },
  late: { label: 'Late', variant: 'yellow', rowClass: 'bg-yellow-50' },
  leave: { label: 'Leave', variant: 'blue', rowClass: 'bg-blue-50' },
};

export default function Attendance() {
  const [filterDate, setFilterDate] = useState('');

  const filtered = attendance.filter(r => !filterDate || r.date === filterDate);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
        {filterDate && (
          <button onClick={() => setFilterDate('')} className="text-sm text-indigo-600 hover:underline">Clear</button>
        )}
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Check In</th>
              <th className="px-5 py-3 font-medium">Check Out</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(record => {
              const cfg = statusConfig[record.status];
              return (
                <tr key={record.id} className={`${cfg.rowClass} hover:opacity-90 transition-opacity`}>
                  <td className="px-5 py-3 font-medium text-gray-800">{record.employeeName}</td>
                  <td className="px-5 py-3 text-gray-500">{record.date}</td>
                  <td className="px-5 py-3 text-gray-500">{record.checkIn}</td>
                  <td className="px-5 py-3 text-gray-500">{record.checkOut}</td>
                  <td className="px-5 py-3">
                    <Badge label={cfg.label} variant={cfg.variant} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No records for selected date.</p>
        )}
      </Card>
    </div>
  );
}
